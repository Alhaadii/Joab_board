import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  contactEmail: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  applyLink: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;