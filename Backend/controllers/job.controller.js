import Company from "../models/company.model.js";
import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      experience,
      company,
      email,
      noOfpositions,
      jobType,
      requirements,
      country,
    } = req.body;
    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !experience ||
      !company ||
      !email ||
      !noOfpositions ||
      !jobType ||
      !requirements
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingJob = await Job.findOne({
      company,
      description,
      location,
    });

    if (existingJob) {
      return res.status(409).json({
        message:
          "A job with the same company, description, and location already exists",
      });
    }
    const companydet = await Company.findById(company);
    if (!companydet) {
      return res.status(404).json({ message: "Company not found" });
    }
    const job = await Job.create({
      title,
      description,
      location,
      salary,
      experience,
      company,
      companyName: companydet.name,
      email,
      createdBy: userId,
      noOfpositions,
      jobType,
      requirements,
      country,
    });
    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobsData = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (jobsData.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json({
      jobs: jobsData,
      message: "Jobs fetched successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ job, message: "Job fetched successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user._id;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ jobs, message: "Jobs fetched successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job, message: "Job updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
