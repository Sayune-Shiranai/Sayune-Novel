import express from "express";
import { getAllBook } from "../controllers/homeController.js";

const router = express.Router();
router.get("/", getAllBook);

export default router;