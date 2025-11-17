import express from "express";
import { getAllChatbox } from "../controllers/ChatboxController.js";

const router = express.Router();
router.get("/", getAllChatbox);

export default router;
