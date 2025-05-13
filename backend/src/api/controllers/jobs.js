import Job from "../models/Jobs.js";

export const getJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    const jobs = await Job.find();
    const jobCount = await Job.countDocuments();
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json({ jobCount, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    description,
    requirements,
    salary,
    jobType,
    contactEmail,
    applyLink,
    postedAt,
  } = req.body;

  const newJob = new Job({
    title,
    company,
    location,
    description,
    requirements,
    salary,
    jobType,
    contactEmail,
    applyLink,
    postedAt,
  });

  try {
    const savedJob = await newJob.save();
    res
      .status(201)
      .json({ Message: "Job created successfully", job: savedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  const {
    title,
    company,
    location,
    description,
    requirements,
    salary,
    jobType,
    contactEmail,
    applyLink,
    postedAt,
  } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        location,
        description,
        requirements,
        salary,
        jobType,
        contactEmail,
        applyLink,
        postedAt,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ Message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Job ID is required" });

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid job ID format",
      });
    }

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
