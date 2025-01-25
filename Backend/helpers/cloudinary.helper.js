import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
