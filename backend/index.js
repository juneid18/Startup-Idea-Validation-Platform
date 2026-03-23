import express from "express";
const app = express();
import authRoutes from "./routes/authRoute.js";
import ideaRoutes from "./routes/ideaRoute.js";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // Host and Remote
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

app.get("/", (req, res) => {
  res.send("backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});