import express from "express";
import upload from "../../middleware/upload.js";

import {
  GetPaged,
  createBook,
  updateBook,
  deleteBook,
  approveBook,
  rejectBook
} from "../../controllers/bookController.js";

const router = express.Router();

router.get("/", GetPaged);  //dashboard/book
router.post("/create", upload.single("img"), createBook); //dashboard/book/create
router.post("/update/:slug",upload.single("img"), updateBook);  //dashboard/book/update/:slug
router.delete("/delete/:id", deleteBook); //dashboard/book/delete/:id
router.post("/approve/:id", approveBook); //dashboard/book/approve/:id
router.post("/reject/:id", rejectBook); //dashboard/book/reject/:id

export default router;
