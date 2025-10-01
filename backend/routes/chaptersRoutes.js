import express from "express";
import { getAllChapters } from "../controllers/chaptersController.js";

const router = express.Router();
router.get("/", getAllChapters);

export default router;
