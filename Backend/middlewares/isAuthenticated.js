import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authentication error" });
  }
};

export const isJobseeker = (req, res, next) => {
  if (req.user.role !== "JOBSEEKER") {
    return res.status(403).json({ message: "Access denied: Not a Jobseeker" });
  }
  next();
};

export const isEmployer = (req, res, next) => {
  if (req.user.role !== "EMPLOYER") {
    return res.status(403).json({ message: "Access denied: Not an Employer" });
  }
  next();
};

export default isAuthenticated;
