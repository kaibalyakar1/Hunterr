import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ddf7ug5kd",
  api_key: process.env.CLOUDINARY_API_KEY || "677527613511884",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "E5jJQMEM-qu7rFHhXuc_G0BABIM",
});

export default cloudinary;
// CLOUDINARY_CLOUD_NAME=dcmsumhde
// CLOUDINARY_API_KEY=186142718344572
// CLOUDINARY_API_SECRET=v9jUf710Zolw0FHBUfpa9Q2HYxw

// CLOUDINARY_CLOUD_NAME = ddf7ug5kd;
// CLOUDINARY_API_KEY = 677527613511884;
// CLOUDINARY_API_SECRET = E5jJQMEM - qu7rFHhXuc_G0BABIM;
