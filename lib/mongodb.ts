import mongoose from "mongoose";
import { Db, MongoClient } from "mongodb";

declare global {
  var mongoose: { conn: any; promise: any };
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
let cachedDb = global.mongoose;

if (!cachedDb) {
  cachedDb = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Db> {
  if (cachedDb.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cachedDb.conn;
  }

  if (!cachedDb.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("🔄 Creating new MongoDB connection...");
    cachedDb.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cachedDb.conn = await cachedDb.promise;
  } catch (error) {
    cachedDb.promise = null;
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
  return cachedDb.conn;
}
