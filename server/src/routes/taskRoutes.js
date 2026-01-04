import express from "express";
import protect from "../middlewares/authMiddleware.js";

import { createTask,getTasksByProject,updateTask,deleteTask } from "../controllers/taskController.js";


const router = express.Router();

router.post("/projects/:projectId/tasks", protect, createTask);
router.get("/projects/:projectId/tasks", protect, getTasksByProject);
router.put("/projects/:projectId/tasks/:taskId", protect, updateTask);
router.delete("/projects/:projectId/tasks/:taskId", protect, deleteTask);




export default router;