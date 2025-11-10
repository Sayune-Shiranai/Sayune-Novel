import express from "express";
import { getAllRole } from "../controllers/roleController.js";

const router = express.Router();
router.get("/", getAllRole);

export default router;
