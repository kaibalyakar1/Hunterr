import {
  applyJob,
  getAllApplication,
  getApplicantsByJobId,
  getApplicationByJobId,
  getApplicationsByCreatedBy,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import express from "express";
import isAuthenticated, {
  isEmployer,
  isJobseeker,
} from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/apply/:id", isAuthenticated, isJobseeker, applyJob);
router.get("/get/:id", isAuthenticated, getApplicationByJobId);
router.get("/applicants/:id", isAuthenticated, getApplicantsByJobId);

router.put("/updateStatus/:id", isAuthenticated, updateStatus);
router.get("/getAll", isAuthenticated, getAllApplication);
router.get("/getApplied", isAuthenticated, getAppliedJobs);
router.get(
  "/getCreated",
  isAuthenticated,
  isEmployer,
  getApplicationsByCreatedBy
);

export default router;
