import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config/db.js";
import dbTestRoute from "./routes/dbTest.js";
import authRoutes from "./routes/authRoutes.js";
import protectedTest from "./routes/protectedTest.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.use("/api", dbTestRoute);

app.use("/api/auth", authRoutes);
app.use("/api", protectedTest);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);
app.use(errorHandler);

export default app;
