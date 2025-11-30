import express from "express";
import upload from "../../middleware/upload.js";

import {
  // getOneBook,
  GetPaged,
  createBook,
  updateBook,
  deleteBook
} from "../../controllers/bookController.js";

const router = express.Router();

// router.get("/test-book", getOneBook);        //dashboard/book/single
router.get("/", GetPaged); //dashboard/book
router.post("/create", upload.single("img"), createBook);      //dashboard/book
router.put("/update/:slug", updateBook); // /dashboard/book/update/:slug
router.delete("/delete/:id", deleteBook);     // /dashboard/book/delete/:id

export default router;
