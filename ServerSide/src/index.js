import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 6000;

app.listen(PORT, ()=>{
    console.log(process.env.MONGO_URL);
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
