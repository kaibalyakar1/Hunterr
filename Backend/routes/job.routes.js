import express from "express";
import isAuthenticated, {
  requireRole,
} from "../middlewares/isAuthenticated.js";
import {
  createJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, requireRole("EMPLOYER"), createJob);
router.get("/getAll", getAllJobs);
router.get(
  "/getAdminJobs",
  isAuthenticated,
  requireRole("EMPLOYER"),
  getAdminJobs
);
router.get("get/:id", getJobById);

export default router;
