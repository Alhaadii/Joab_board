import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./api/routers/register.js";
import loginRoutes from "./api/routers/login.js";
import jobRoutes from "./api/routers/jobs.js";
import cors from "cors";
import path from "path";
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/user", loginRoutes);
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
