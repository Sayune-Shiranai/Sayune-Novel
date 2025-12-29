import express from "express";
import upload from "../../middleware/upload.js";
import { verifyToken } from "../../middleware/verifyToken.js";

import {
  GetPaged,
  getBookBySlug,
  createBook,
  updateBook,
  deleteBook,
  approveBook,
  rejectBook
} from "../../controllers/bookController.js";

const router = express.Router();

router.get("/", GetPaged);  //dashboard/book
router.get("/:slug", getBookBySlug); //dashboard/book/:slug
router.post("/create", upload.single("img"),verifyToken ,createBook); //dashboard/book/create
router.post("/update/:slug",upload.single("img"),verifyToken, updateBook);  //dashboard/book/update/:slug
router.delete("/delete/:id", deleteBook); //dashboard/book/delete/:id
router.post("/approve/:id", approveBook); //dashboard/book/approve/:id
router.post("/reject/:id", rejectBook); //dashboard/book/reject/:id

export default router;
