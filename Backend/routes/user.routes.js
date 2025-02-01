import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload.single("file"), registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.put("/update/:id", isAuthenticated, upload.single("file"), updateUser);

export default router;
