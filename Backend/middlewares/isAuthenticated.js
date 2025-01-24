import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Fetch the user from the database
    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};

// Middleware to check for specific roles
export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export default isAuthenticated;
