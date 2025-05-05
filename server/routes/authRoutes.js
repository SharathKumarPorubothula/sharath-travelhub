// server/routes/authRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", getUserProfile);

// router.get('/profile',  getProfile);
router.put('/profile',updateProfile);



export default router;
 