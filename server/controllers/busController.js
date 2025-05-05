// server/controllers/busController.js

import Bus from "../models/Bus.js";

//Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses" });
  }
};

//Search buses by source, destination, and date
export const searchBuses = async (req, res) => {
  const { from, to, date } = req.body;

  try {
    const buses = await Bus.find({
      source: from,
      destination: to,
    });

    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// Get bus details by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus" });
  }
};
