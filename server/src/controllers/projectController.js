import pool from "../config/db.js";
import { getPagination } from "../utils/pagination.js";
import {asyncHandler } from "../utils/asyncHandler.js";

// CREATE PROJECT

export const createProject = asyncHandler( async(req,res) => {
  const {name, description} = req.body || {};
  const userId = req.user.id;

  const result = await pool.query(
    `INSERT INTO projects (name, description , user_id)
    VALUES ($1,$2,$3)
    RETURNING id , name, description, created_at`,
    [name, description || "", userId],
  );
  res.status(201).json({project : result.rows[0]});
})

// export const createProject = async (req, res) => {

//   try {
//     const { name, description } = req.body || {};
//     if (!name) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Project name is required" });
//     }

//     const userId = req.user.id;

//     const result = await pool.query(
//       "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING id, name, description, created_at",
//       [name, description || "", userId],
//     );

//     res
//       .status(201)
//       .json({ message: "Project created", project: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// GET MY PROJECTS
export const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, search, sort, order } = req.query;
    const { page: p, limit: l, offset } = getPagination(page, limit);

    // allowlist
    const sortField = ["created_at", "name"].includes(sort)
      ? sort
      : "created_at";
    const sortOrder = order === "asc" ? "ASC" : "DESC";
    const searchValue = search ? `%${search}%` : null;

    const countQuery = `
    SELECT COUNT(*) FROM projects
    WHERE user_id = $1 AND deleted_at IS NULL
    ${searchValue ? "AND name ILIKE $2" : ""}`;

    const countParams = search ? [userId, searchValue] : [userId];

    const totalRes = await pool.query(countQuery, countParams);
    const total = parseInt(totalRes.rows[0].count, 10);

    const dataQuery = `
    SELECT id, name, description,created_at FROM projects
    WHERE user_id = $1 AND deleted_at IS NULL
    ${search ? "AND name ILIKE $2" : ""}
    ORDER BY ${sortField} ${sortOrder}
    LIMIT $${search ? 3 : 2} OFFSET $${search ? 4 : 3}`;

    const dataParams = search
      ? [userId, searchValue, l, offset]
      : [userId, l, offset];

    const result = await pool.query(dataQuery, dataParams);
    res.json({
      data: result.rows,
      meta: {
        page: p,
        limit: l,
        total,
        totalPages: Math.ceil(total / l),
      },
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
      [id],
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (existing.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await pool.query(
      "UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description, created_at",
      [name, description || "", id],
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
      [id],
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

// ARCHIVE PROJECT (SOFT DELETE)

export const archiveProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Check ownership
    const existing = await pool.query(
      "SELECT user_id FROM projects WHERE id = $1",
      [id],
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (existing.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await pool.query("UPDATE projects SET deleted_at = NOW() WHERE id = $1", [
      id,
    ]);

    // also archive tasks
    await pool.query(
      "UPDATE tasks SET deleted_at = NOW() WHERE project_id = $1",
      [id],
    );
    res.json({ message: "Project archived" });
  } catch (err) {
    console.error("ARCHIVE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESTORE PROJECT
export const restoreProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existing = await pool.query(
      "SELECT user_id FROM projects WHERE id = $1",
      [id],
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (existing.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await pool.query("UPDATE projects SET deleted_at = NULL WHERE id = $1", [
      id,
    ]);

    // also restore tasks
    await pool.query(
      "UPDATE tasks SET deleted_at = NULL WHERE project_id = $1",
      [id],
    );
    res.json({ message: "Project restored" });
  } catch (err) {
    console.error("RESTORE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
