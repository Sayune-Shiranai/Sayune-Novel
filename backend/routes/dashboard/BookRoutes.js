import express from "express";
import {
  createBook,
  updateBookBySlug,
  deleteBook
} from "../../controllers/bookController.js";

const router = express.Router();

router.post("/", createBook);          // /dashboard/book
router.put("/:slug", updateBookBySlug); // /dashboard/book/:slug
router.delete("/:id", deleteBook);     // /dashboard/book/:id

export default router;
