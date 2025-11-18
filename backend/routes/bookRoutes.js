import express from "express";
import {
  getAllBooks,
  getBookBySlug
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);          // GET /book
router.get("/:slug", getBookBySlug);   // GET /book/ten-sach

export default router;
