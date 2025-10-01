import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies/auth headers
}));
app.use('/api/users' , userRoutes);
app.use('/api/file' , fileRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, ()=>{
    // console.log(process.env.MONGO_URL);
    connectDB();
    console.log("\u2705 Server is running on port " + PORT);
})
