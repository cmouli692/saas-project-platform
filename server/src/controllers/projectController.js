import pool from "../config/db.js";

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
    const result = await pool.query(
      "SELECT id, name, description, created_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ projects: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
