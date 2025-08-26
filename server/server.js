// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  // .connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   tls: true,
  // })
  .connect(process.env.MONGO_URI, { tls: true })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
