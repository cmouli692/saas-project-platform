import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js";
import "./config/db.js";
import dbTestRoute from "./routes/dbTest.js";
import authRoutes from "./routes/authRoutes.js";
import protectedTest from "./routes/protectedTest.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

import { apiLimiter } from "./middlewares/rateLimiter.js";
import { requestId } from "./middlewares/requestId.js";
import { logger } from "./middlewares/logger.js";
import { config } from "./config/config.js";
import { validateEnv } from "./config/validateEnv.js";


const app = express();

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        config.clientUrl ,
        "http://localhost:5173",
      ];
      if(!origin || allowedOrigins.includes(origin)){
        callback(null, true);
      }
      else{
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods : ["GET" , "POST" , "PUT" , "DELETE" ],
  })
);

app.use(apiLimiter)

app.use(requestId);
app.use(logger)

app.use(express.json({limit : "10kb"}));

app.use(morgan("dev"));
validateEnv()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
