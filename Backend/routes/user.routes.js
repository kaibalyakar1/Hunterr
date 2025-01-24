import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.put("/update/:id", isAuthenticated, updateUser);

export default router;
