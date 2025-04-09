// server/routes/busRoutes.js

import express from "express";
import {
  getAllBuses,
  searchBuses,
  getBusById,
} from "../controllers/busController.js";

const router = express.Router();

// Get all buses
router.get("/", getAllBuses);

// Search buses by route and date
router.post("/search", searchBuses);

// Get a specific bus by ID
router.get("/:id", getBusById);

export default router;
