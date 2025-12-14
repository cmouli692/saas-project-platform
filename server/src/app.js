import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())

app.use(morgan("dev"))

app.get("/api/health", (req,res)=> {
    res.json({status: "OK" , message: "Backend is running"})
}) 


export default app;