import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("CRITICAL: Missing MONGO_URI in environment variables");
    return; // Don't crash, let the routes handle the lack of DB if needed or just log
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Again, don't process.exit(1) on serverless
  }
};

export default connectDB;

