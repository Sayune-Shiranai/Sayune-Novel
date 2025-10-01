import express from "express";
import { getAllNotices } from "../controllers/noticesController.js";

const router = express.Router();
router.get("/", getAllNotices);

export default router;
