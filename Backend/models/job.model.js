import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: Number,
  },
  experience: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  companyName: {
    type: String,
  },
  requirements: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  jobType: {
    type: String,
  },
  country: {
    type: String,
  },
  noOfpositions: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
