import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.get("/db-test",  async (req,res) => {
    try {

        const result = await pool.query("SELECT NOW()")
        
        res.json({success: true, time: result.rows[0]})
        
    } catch (error) {

        console.log("error block is blocking")
        
        console.error(error);
        res.status(500).json({success:false  })
    }
})

export default router;