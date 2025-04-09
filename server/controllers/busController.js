// server/controllers/busController.js

import Bus from "../models/Bus.js";

// @desc    Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses" });
  }
};

// @desc    Search buses by source, destination, and date
export const searchBuses = async (req, res) => {
  const { source, destination, date } = req.body;

  try {
    const buses = await Bus.find({
      source: source,
      destination: destination,
      date: date,
    });

    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// @desc    Get bus details by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus" });
  }
};
