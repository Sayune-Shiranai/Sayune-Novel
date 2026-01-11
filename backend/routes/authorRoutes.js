import express from "express";
import { getBooksByAuthor } from "../controllers/authorController.js";

const router = express.Router();
router.get("/:id", getBooksByAuthor);

export default router;
