// // server/server.js

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import busRoutes from "./routes/busRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/buses", busRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // MongoDB connection
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(` Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error(" DB connection error:", err));


// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // ✅ If you're using db.js
import busRoutes from "./routes/busRoutes.js"; // your routes
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
 // ✅ If you're using bookingRoutes.js

dotenv.config();

const app = express();
app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // to handle JSON requests

// Routes
app.use("/api/buses", busRoutes); // ✅ Route for buses
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
// ✅ Route for user bookings



// Start server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
