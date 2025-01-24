import express from "express";
import {
  createCompany,
  getCompany,
  getCompanyById,
  getCompanyByOwner,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCompany);
// router.get("/get", isAuthenticated, getCompany);
router.get("/get/owner", isAuthenticated, getCompanyByOwner);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
