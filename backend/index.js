import express from "express";
const app = express();
import authRoutes from "./routes/authRoute.js";
import ideaRoutes from "./routes/ideaRoute.js";
import dotenv from "dotenv";
dotenv.config();

const requiredEnvs = [
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];
const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);
if (missingEnvs.length > 0) {
  console.error("Missing required environment variables:", missingEnvs);
  process.exit(1);
}

import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: [
    "https://startup-idea-validation-platform-ca.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.HOST_URL,           // host Vercel URL (set in Render env vars)
  ].filter(Boolean),
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