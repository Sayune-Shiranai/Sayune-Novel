import express from "express";
import { getAllBook } from "../controllers/HomeController.js";

const router = express.Router();
router.get("/", getAllBook);

export default router;