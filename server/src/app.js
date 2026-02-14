// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import swaggerUi from "swagger-ui-express"
// import { swaggerSpec } from "./config/swagger.js";
// import "./config/db.js";
// import dbTestRoute from "./routes/dbTest.js";
// import authRoutes from "./routes/authRoutes.js";
// import protectedTest from "./routes/protectedTest.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js"
// import { errorHandler } from "./middlewares/errorHandler.js";

// import { apiLimiter } from "./middlewares/rateLimiter.js";
// import { requestId } from "./middlewares/requestId.js";
// import { logger } from "./middlewares/logger.js";
// import { config } from "./config/config.js";
// import { validateEnv } from "./config/validateEnv.js";


// const app = express();



// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         config.clientUrl ,
//         "http://localhost:5173",
//       ];
//       if(!origin || allowedOrigins.includes(origin)){
//         callback(null, true);
//       }
//       else{
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods : ["GET" , "POST" , "PUT" , "DELETE" ],
//     allowedHeaders: ["Content-Type" , "Authorization"],
//   })
// );

// app.options("*", cors());

// app.use(helmet());

// app.use(apiLimiter)

// app.use(requestId);
// app.use(logger)

// app.use(express.json({limit : "10kb"}));

// app.use(morgan("dev"));
// validateEnv()

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", message: "Backend is running" });
// });

// app.use("/api", dbTestRoute);

// app.use("/api/auth", authRoutes);
// app.use("/api", protectedTest);
// app.use("/api/projects", projectRoutes);
// app.use("/api", taskRoutes);
// app.use(errorHandler);


// export default app;


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger.js";
import "./config/db.js";

import dbTestRoute from "./routes/dbTest.js";
import authRoutes from "./routes/authRoutes.js";
import protectedTest from "./routes/protectedTest.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { requestId } from "./middlewares/requestId.js";
import { logger } from "./middlewares/logger.js";

import { config } from "./config/config.js";
import { validateEnv } from "./config/validateEnv.js";

const app = express();

/* ============================
   ✅ CORS — PRODUCTION READY
============================ */

const corsOptions = {
  origin: (origin, callback) => {
    // allow Postman, curl, server-to-server
    if (!origin) return callback(null, true);

    // localhost (dev)
    if (origin === "http://localhost:5173") {
      return callback(null, true);
    }

    // Vercel preview + prod
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    // explicit prod client
    if (origin === config.clientUrl) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ============================
   🔐 SECURITY & CORE MIDDLEWARE
============================ */

app.use(helmet());
app.use(apiLimiter);
app.use(requestId);
app.use(logger);

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

validateEnv();

/* ============================
   📚 DOCS & HEALTH
============================ */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

/* ============================
   🚏 ROUTES
============================ */

app.use("/api", dbTestRoute);
app.use("/api/auth", authRoutes);
app.use("/api", protectedTest);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

/* ============================
   ❌ ERROR HANDLER (LAST)
============================ */

app.use(errorHandler);

export default app;

