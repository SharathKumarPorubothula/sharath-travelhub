// server/routes/busRoutes.js

import express from "express";
import {
  getAllBuses,
  searchBuses,
} from "../controllers/busController.js";

const router = express.Router();

// Get all buses
router.get("/", getAllBuses);

// Search buses by route and date
router.post("/search", searchBuses);


export default router;
