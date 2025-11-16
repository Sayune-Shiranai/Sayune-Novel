import express from "express";
import {
  createBook,
  getAllBooks,
  getBookBySlug,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/create-book", createBook);
router.get("/", getAllBooks);
router.get("/:slug", getBookBySlug);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
