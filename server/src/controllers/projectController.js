import pool from "../config/db.js";
import { getPagination } from "../utils/pagination.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body || {};
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Project name is required" });
    }

    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING id, name, description, created_at",
      [name, description || "", userId]
    );

    res
      .status(201)
      .json({ message: "Project created", project: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET MY PROJECTS
export const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;
    const { page: p, limit: l, offset } = getPagination(page, limit);

    const totalRes = await pool.query(
      "SELECT COUNT(*) FROM projects WHERE user_id = $1",
      [userId]
    );

    const total = parseInt(totalRes.rows[0].count, 10);

    const result = await pool.query(
      `SELECT id, name, description, created_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [userId, l, offset]
    );

    // const result = await pool.query(
    //   "SELECT id, name, description, created_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
    //   [userId]
    // );

    // res.json({ projects: result.rows });

    res.json({
      data: result.rows,
      meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
    });
  } catch (error) {
    console.error("GET PROJECTS PAGINATED ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROJECT

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body || {};
    const userId = req.user.id;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Project name is required" });
    }

    // Check ownership
    const existing = await pool.query(
      "SELECT user_id FROM projects WHERE id = $1",
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (existing.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await pool.query(
      "UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description, created_at",
      [name, description || "", id]
    );

    res.json({ message: "Project updated", project: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Check ownership
    const existing = await pool.query(
      "SELECT user_id FROM projects WHERE id = $1",
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (existing.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 
