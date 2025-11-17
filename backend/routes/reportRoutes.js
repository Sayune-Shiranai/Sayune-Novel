import express from "express";
import { getAllReport } from "../controllers/ReportController.js";

const router = express.Router();
router.get("/", getAllReport);

export default router;
