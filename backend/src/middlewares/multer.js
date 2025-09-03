// src/middlewares/multer.js
import multer from "multer";

// store file in memory instead of saving to disk
const storage = multer.memoryStorage();

export const upload = multer({ storage });
