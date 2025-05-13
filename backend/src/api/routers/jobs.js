import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.js";
import { isAuthenticated, isAdmin } from "../../utils/auth.js";

const router = express.Router();

router
  .route("/api")
  .get(isAuthenticated, getJobs)
  .post(isAuthenticated, isAdmin, createJob);
router
  .route("/api/:id")
  .get(isAuthenticated, getJobById)
  .put(isAuthenticated, isAdmin, updateJob)
  .delete(isAuthenticated, isAdmin, deleteJob);


export default router;