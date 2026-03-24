import express from "express";
import cors from "cors";
import Stripe from "stripe";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

import phoneModelRoutes from "./routes/phoneModelRoutes.js";
import petProductRoutes from "./routes/petProductRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGINS = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map(url => url.trim())
  : [
    "https://case-craft-final.vercel.app",
    "https://case-craft-final-yc3q.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5000"
  ];

console.log("Allowed Origins:", ALLOWED_ORIGINS);

let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn("WARNING: STRIPE_SECRET_KEY is missing. Stripe functionality will be disabled.");
}

const isVercel = process.env.VERCEL === '1' || !!process.env.NOW_REGION;

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || ALLOWED_ORIGINS.includes("*")) {
        callback(null, true);
      } else {
        console.warn(`Blocked by CORS: Origin ${origin} not in ALLOWED_ORIGINS`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Database 
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed in middleware:", error);
    res.status(500).json({ message: "Database connection error" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Phone Cover Customizer API is running", isVercel });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV,
    isVercel: isVercel,
    allowedOrigins: ALLOWED_ORIGINS
  });
});

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured on the server." });
    }
    const { amount, currency = "usd" } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/phone-models", phoneModelRoutes);
app.use("/api/pet-products", petProductRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/pet-products", petProductRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: messages.join(", ")
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate entry. This record already exists."
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired"
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

if (!isVercel && process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

