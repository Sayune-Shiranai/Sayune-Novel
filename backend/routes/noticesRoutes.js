import express from "express";
import { getAllNotices } from "../controllers/NoticesController.js";

const router = express.Router();
router.get("/", getAllNotices);

export default router;
