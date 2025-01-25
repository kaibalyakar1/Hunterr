import express from "express";
import isAuthenticated, { isEmployer } from "../middlewares/isAuthenticated.js";
import {
  createJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Route to create a job (EMPLOYER only)
router.post("/create", isAuthenticated, isEmployer, createJob);

// Route to get all jobs (accessible to everyone)
router.get("/getAll", getAllJobs);

// Route to get admin jobs (EMPLOYER only)
router.get("/getAdminJobs", isAuthenticated, isEmployer, getAdminJobs);

// Route to get a job by ID (accessible to everyone)
router.get("/get/:id", getJobById);

// Route to delete a job (EMPLOYER only)
router.delete("/delete/:id", isAuthenticated, isEmployer, deleteJob);

export default router;
