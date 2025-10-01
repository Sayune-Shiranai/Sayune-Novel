import express from "express";
import { getAllForum } from "../controllers/forumController.js";

const router = express.Router();
router.get("/", getAllForum);

export default router;
