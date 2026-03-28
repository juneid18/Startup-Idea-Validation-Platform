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
const allowedOrigins = [
  "https://startup-idea-validation-platform.vercel.app",
  "https://startup-idea-validation-platform-ten.vercel.app",
  "https://startup-idea-validation-platform-ca.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.HOST_URL,
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});