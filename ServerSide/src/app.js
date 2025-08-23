import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

export default app;
