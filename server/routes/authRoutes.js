// server/routes/authRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  getUserProfile
} from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

router.get("/profile", getUserProfile);

// router.get('/profile',  getProfile);
router.put('/profile',updateProfile);



export default router;
 