import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) {
      return null;
    }
    const result = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    return { message: "Error uploading image to Cloudinary", error };
  }
};

export default uploadOnCloudinary;
