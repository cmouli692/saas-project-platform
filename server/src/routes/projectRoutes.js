import express from "express";
import {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject)


export default router;