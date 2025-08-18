import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("\u2705 MongoDB connected successfully");
    } catch (error) {
        console.error("\u274C MongoDB connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;