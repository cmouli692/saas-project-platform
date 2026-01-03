import express from "express";
import {
  createProject,
  getMyProjects,
} from "../controllers/projectController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);


export default router;