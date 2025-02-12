import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

//Create Company
export const createCompany = async (req, res) => {
  try {
    const { name, email, location } = req.body;
    console.log(name);

    // const company = await Company.findOne({ name });

    // if (company) {
    //   return res.status(400).json({ message: "Company already exists" });
    // }

    const newCompany = await Company.create({
      name,
      email,
      location,
      userId: req.user._id,
    });

    await newCompany.save();
    res.status(201).json({
      message: "Company created successfully",
      newCompany,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Get Company

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Get Company by Owner

export const getCompanyByOwner = async (req, res) => {
  try {
    const userId = req.user._id; // Access the authenticated user's ID

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const companies = await Company.find({ userId }); // Find companies by user ID

    if (!companies || companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No companies found for this user" });
    }

    res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching companies" });
  }
};

//Get Company by ID
export const getCompanyById = async (req, res) => {
  try {
    console.log("Company ID:", req.params.id);
    const compaanyId = req.params.id;
    const company = await Company.findById(compaanyId);
    console.log("Company:", company);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, email, location, description, website } = req.body;
    console.log(req.body);
    // Verify at least one field is being updated
    if (!name && !email && !location && !description && !website && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Create an update object with only the provided fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (location) updateFields.location = location;
    if (description) updateFields.description = description;
    if (website) updateFields.website = website;

    // Handle logo upload if file exists
    if (req.file) {
      const fileUri = getDataUri(req.file); // Ensure this function is defined
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        folder: "company-logos",
        type: "upload",
      });

      updateFields.logo = cloudResponse.secure_url;
    }

    // Update the company using findByIdAndUpdate
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    console.log("Updated Company:", updatedCompany);
    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (err) {
    console.error("Error updating company:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update company",
      error: err.message,
    });
  }
};

//Delete Company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    await company.remove();
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
