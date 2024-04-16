import createHttpError from "http-errors";
import { Config } from "./_config";
import mongoose from "mongoose";
export default async function connectDB(): Promise<void> {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`
                  *************************************************
                          Database connected successfully!!
                  *************************************************
    `);
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting to the database", err);
    });
    await mongoose.connect(Config.MONGODB_URI);
  } catch (error: any) {
    createHttpError(500, "Error:: unable to connectDatabase");
    process.exit(1);
  }
}
