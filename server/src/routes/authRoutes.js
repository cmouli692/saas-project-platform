import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *                email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                password:
 *                  type: string
 *                  example: strongPassword123
 *   responses:
 *     201:
 *       description: User registered successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User registered successfully
 *     400:
 *       description: Validation error or user already exists
 *     500:
 *       description: Server error
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: User login
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required: [email, password]
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *  responses:
 *    200:
 *      description: Login successful
 *    401:
 *      description: Invalid credentials
 */
router.post("/login", login);

export default router;
