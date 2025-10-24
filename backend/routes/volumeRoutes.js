import express from "express";
import { getAllVolume } from "../controllers/volumeController.js";

const router = express.Router();
router.get("/", getAllVolume);

export default router;
