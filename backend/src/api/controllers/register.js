import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const isExistuser = await User.findOne({ email });
    if (isExistuser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userDetails = await User.create({
      fullname,
      email,
      password,
      role,
    });
    userDetails.password = await userDetails.encryptPassword(password);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userDetails._id,
        name: userDetails.fullname,
        email: userDetails.email,
        isAdmin: userDetails.role === "admin",
        token: generateToken(userDetails._id),
      },
    });
    await userDetails.save();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    const countUsers = await User.countDocuments({});

    res.status(200).json({ Total_users: countUsers, users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
