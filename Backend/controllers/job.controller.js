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
      companyId, // Ensure this matches the frontend payload
      noOfpositions,
      jobType,
      requirements,
    } = req.body;

    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Create the job
    const job = await Job.create({
      title,
      description,
      location,
      salary,
      experience,
      company: companyId, // Use companyId from the request
      companyName: company.name,
      createdBy: userId,
      noOfpositions,
      jobType,
      requirements,
      postedDate: new Date(),
    });

    res
      .status(201)
      .json({ message: "Job created successfully", job, success: true });
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
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });
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
    const adminId = req.user?._id;

    if (!adminId) {
      console.error("Admin ID is undefined!");
      return res.status(401).json({ message: "Unauthorized access" });
    }

    console.log("Fetching jobs for Admin:", adminId);

    const jobs = await Job.find({ createdBy: adminId }).populate("company");

    if (!jobs || jobs.length === 0) {
      console.warn("No jobs found for Admin:", adminId);
      return res.status(404).json({ message: "No jobs found" });
    }

    console.log("Admin Jobs Found:", jobs.length);

    res.status(200).json({
      success: true,
      jobs,
      message: "Jobs fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching admin jobs:", err);
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
