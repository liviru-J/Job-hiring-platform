import mongoose from "mongoose";

export const connectDb = async () => {
    try {
      if (!process.env.MONGODB_DATABASE) {
        throw new Error("MONGODB_DATABASE environment variable not defined");
      }
      console.log("Connecting to database...");
      await mongoose.connect(process.env.MONGODB_DATABASE);
      console.log("DB connection successful!");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  };
        