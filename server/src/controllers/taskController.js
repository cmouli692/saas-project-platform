import pool from "../config/db.js";
import { getPagination } from "../utils/pagination.js";

// helper: check project ownership
const checkProjectOwnership = async (projectId, userID) => {
  const res = await pool.query("SELECT * FROM projects WHERE id = $1", [
    projectId,
  ]);
  if (res.rows.length === 0) {
    return { ok: false, code: 404 };
  }

  if (res.rows[0].user_id !== userID) {
    return { ok: false, code: 403 };
  }
  return { ok: true };
};

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body || {};
    const userId = req.user.id;
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const check = await checkProjectOwnership(projectId, userId);
    if (!check.ok) {
      return res.status(check.code).json({
        message: check.code === 404 ? "Project not found" : "Forbidden",
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, project_id) VALUES ($1, $2) RETURNING id, title, completed, created_at`,
      [title, projectId],
    );
    res.status(201).json({ task: result.rows[0] });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET TASKS BY PROJECT
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { page, limit, search, sort, order } = req.query;
    const { page: p, limit: l, offset } = getPagination(page, limit);
    const check = await checkProjectOwnership(projectId, userId);
    if (!check.ok) {
      return res.status(check.code).json({
        message: check.code === 404 ? "Project not found" : "Forbidden",
      });
    }

    // allowlist
    const sortField = ["created_at", "completed"].includes(sort)
      ? sort
      : "created_at";
    const sortOrder = order === "asc" ? "ASC" : "DESC";
    const searchValue = search ? `%${search}%` : null;

    const countQuery = `
    SELECT COUNT(*) FROM tasks
    WHERE project_id = $1 AND deleted_at IS NULL
    ${search ? "AND title ILIKE $2" : ""}`;

    const countParams = search ? [projectId, searchValue] : [projectId];
    const totalRes = await pool.query(
      countQuery,
      countParams,
    );
    const total = parseInt(totalRes.rows[0].count, 10);

    const dataQuery = `
    SELECT id , title , completed , created_at FROM tasks
    WHERE project_id = $1 AND deleted_at IS NULL
    ${search ? "AND title ILIKE $2" : ""}
    ORDER BY ${sortField} ${sortOrder}
    LIMIT $${search ? 3 : 2} OFFSET $${search ? 4 : 3}`;
    const dataParams = search
      ? [projectId, searchValue, l, offset]
      : [projectId, l, offset];
    const result = await pool.query(dataQuery, dataParams);
    res.json({
      tasks: result.rows,
      meta: {
        page: p,
        limit: l,
        total,
        totalPages: Math.ceil(total / l),
      },
    });
   
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Server error" });

  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, completed } = req.body || {};
    const userId = req.user.id;
    const check = await checkProjectOwnership(projectId, userId);
    if (!check.ok) {
      return res.status(check.code).json({
        message: check.code === 404 ? "Project not found" : "Forbidden",
      });
    }
    const result = await pool.query(
      `UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 AND project_id = $4 RETURNING id, title, completed, created_at`,
      [title, completed, taskId, projectId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ task: result.rows[0] });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE TASK

export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const userId = req.user.id;
    const check = await checkProjectOwnership(projectId, userId);
    if (!check.ok) {
      return res.status(check.code).json({
        message: check.code === 404 ? "Project not found" : "Forbidden",
      });
    }
    const result = await pool.query(
      `DELETE FROM tasks WHERE id = $1 AND project_id = $2`,
      [taskId, projectId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
