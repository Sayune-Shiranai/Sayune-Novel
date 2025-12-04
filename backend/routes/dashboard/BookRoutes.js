import express from "express";
import upload from "../../middleware/upload.js";
// const multer = require("multer");
// // const storage = multer.memoryStorage();
// const upload = multer({ dest: 'media/books_images' });

import {
  // getOneBook,
  GetPaged,
  createBook,
  updateBook,
  deleteBook,
  approveBook,
  rejectBook
} from "../../controllers/bookController.js";

const router = express.Router();

router.get("/", GetPaged); //dashboard/book
router.post("/create", upload.single("img"), createBook);      //dashboard/book/create
router.post("/update/:slug",upload.single("img"), updateBook); // /dashboard/book/update/:slug
router.delete("/delete/:id", deleteBook);     // /dashboard/book/delete/:id
router.post("/approve/:id", approveBook);
router.post("/reject/:id", rejectBook);

export default router;
