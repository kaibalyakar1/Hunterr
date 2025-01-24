import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
