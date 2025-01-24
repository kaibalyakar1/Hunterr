import Company from "../models/company.model.js";

//Create Company
export const createCompany = async (req, res) => {
  try {
    const { name, email, location } = req.body;
    if (!name || !email || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const company = await Company.findOne({ email, name });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = await Company.create({
      name,
      email,
      location,
      userId: req.user._id,
    });

    await newCompany.save();
    res
      .status(201)
      .json({ message: "Company created successfully", newCompany });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Get Company

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
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
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, email, location, description, website } = req.body;
    const file = req.file;
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (name) company.name = name;
    if (email) company.email = email;
    if (location) company.location = location;
    if (description) company.description = description;
    if (website) company.website = website;
    // if (logo) company.logo = logo;
    await company.save();
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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
