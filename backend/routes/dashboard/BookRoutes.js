import express from "express";
import {
  getOneBook,
  createBook,
  updateBookBySlug,
  deleteBook
} from "../../controllers/bookController.js";

const router = express.Router();

router.get("/test-book", getOneBook);        //dashboard/book/single
router.post("/", createBook);      //dashboard/book
router.put("/:slug", updateBookBySlug); // /dashboard/book/:slug
router.delete("/:id", deleteBook);     // /dashboard/book/:id

export default router;
