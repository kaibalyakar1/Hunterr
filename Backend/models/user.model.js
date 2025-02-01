import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["JOBSEEKER", "EMPLOYER"],
      default: "JOBSEEKER",
    },
    file: {
      type: String,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: {
        type: [String],
      },
      experience: {
        type: Number,
      },
      education: {
        type: String,
      },
      location: {
        type: String,
      },
      resume: {
        type: String,
      },
      resumeOriginalName: {
        type: String,
      },
      profileImage: {
        type: String,
        default: "",
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
