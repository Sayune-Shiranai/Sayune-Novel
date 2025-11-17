import express from "express";
import BookController from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", BookController.getAll);
router.get("/:slug", BookController.getBySlug);

export default router;
