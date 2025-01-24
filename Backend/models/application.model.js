import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resume: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
