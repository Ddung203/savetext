import mongoose from "mongoose";

import AppConfig from "./app.config.js";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(AppConfig.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Database connection error: ${error.message}`);
    } else {
      console.error(
        "An unknown error occurred while connecting to the database"
      );
    }
    process.exit(1);
  }
};

export default connectMongoDb;
