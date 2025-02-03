import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

//Regsiter User
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or phone" });
    }

    // Handle file upload to Cloudinary (if a file is provided)
    let profileImage = "";
    if (req.file) {
      const fileUri = getDataUri(req.file); // Convert file to data URI
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        upload_preset: "ml_default", // Your Cloudinary upload preset
        resource_type: "auto", // Automatically detect resource type (image, video, etc.)
      });
      profileImage = cloudResponse.secure_url; // Save the secure URL of the uploaded file
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with profile image (if uploaded)
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      profile: {
        profileImage, // Save the Cloudinary URL in the user's profile
      },
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        profile: {
          profileImage: newUser.profile.profileImage,
        },
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Input validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, password and role",
      });
    }

    // Find user with case-insensitive email
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
      role,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email and role",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // User data to return
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
      token,
    };

    // Set cookie and send response
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
        user: userData,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Logout
export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        maxAge: 0,
      })
      .json({ message: "Logout successful", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, bio, skills } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update basic fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skills ? JSON.parse(skills) : user.profile.skills;

    // Only process file if it exists
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        access_mode: "public",
        folder: "resumes",
        type: "upload",
        format: "pdf",
      });
      console.log("Cloudinary response:", cloudResponse);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};
