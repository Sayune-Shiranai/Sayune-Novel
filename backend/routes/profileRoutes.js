import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getProfile } from "../controllers/profileController.js";

const router = express.Router();
router.get("/", verifyToken, getProfile);

export default router;
