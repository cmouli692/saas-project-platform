import express from "express";
import {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
  archiveProject,
  restoreProject
} from "../controllers/projectController.js";
import { createProjectSchema } from "../validators/project.schema.js";
import protect from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/" ,protect ,validate(createProjectSchema) , createProject);
// router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.patch("/:id/archive",protect, archiveProject);
router.patch("/:id/restore", protect, restoreProject);

export default router;
