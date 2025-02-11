import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const userId = req.user._id;

    console.log(userId);
    //CHECK IF USER HAS ALREADY APPLIED FOR THE JOB
    const application = await Application.findOne({
      applicant: userId,
      job: jobId,
    });
    if (application) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    //CHECK IF JOB EXISTS
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //CREATE NEW APPLICATION
    const newApplication = new Application({
      job: jobId,
      applicant: userId,
    });

    await newApplication.save();

    // Add the new application's ID to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();
    res.status(201).json({
      message: "Application submitted successfully",
      newApplication,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const getApplicationByJobId = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const applications = await Application.find({ job: jobId }).populate({
      path: "applicant",
      options: { sort: { createdAt: -1 } },
    });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const getApplicationsByCreatedBy = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ createdBy: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.status(200).json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getApplicantsByJobId = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    const applicants = await Application.find({ job: jobId })
      .populate("job") // Populate job details
      .populate("applicant");
    if (!applicants || applicants.length === 0) {
      return res.status(404).json({ message: "No applicants found" });
    }
    res.status(200).json({ applicants, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!applicationId) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.status = status;
    await application.save();
    res
      .status(200)
      .json({
        message: "Status updated successfully",
        application,
        success: true,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find().populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: { path: "company", options: { sort: { createdAt: -1 } } },
    });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.status(200).json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
