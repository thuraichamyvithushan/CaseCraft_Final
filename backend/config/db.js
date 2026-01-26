import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("CRITICAL: Missing MONGO_URI in environment variables");
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;

