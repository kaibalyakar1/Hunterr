import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

//Regsiter User
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email, phone });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true, newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //Check role
    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid Role" });
    }
    const tokenData = {
      userId: user._id,
    };
    // Generate JWT token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const isuser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    //cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: `welcome back ${user.name}`,
        success: true,
        isuser,
        token,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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

    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Update profile fields if provided
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills;

    // Save updated user
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
