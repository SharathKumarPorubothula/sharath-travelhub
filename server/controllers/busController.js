
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

