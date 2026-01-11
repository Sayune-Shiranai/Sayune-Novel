import express from "express";
import { getBooksByCategory } from "../controllers/categoryController.js";

const router = express.Router();
router.get("/:id", getBooksByCategory);

export default router;
