// server/controllers/userController.js

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();


//  Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({message: "User registered successfully"})
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};


const generate= (email) => {
  return jwt.sign({email}, "sharath", {
    expiresIn: "30d",
  });
};
//  Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid Email" 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid Password" 

      });
    }

    // Generate JWT token

const token = generate(email);

    res.status(200).json({
      Token: token,
      message: "Login successful",
      userName: user.name
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({email:email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, OEmail } = req.body;

    // Use findOne to get the single user object
    const user = await User.findOne({ email: OEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if new values are provided
    user.name = name || user.name;
    user.email = email || user.email;

    // Save the updated user data
    await user.save();

    res.json({ message: "Profile updated successfully",newUserName:user.name,newEmail:user.email });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};


