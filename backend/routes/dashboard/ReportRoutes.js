import express from "express";
import {
    getAllReport
 } from "../../controllers/reportController.js";

const router = express.Router();
router.get("/", getAllReport);

export default router;