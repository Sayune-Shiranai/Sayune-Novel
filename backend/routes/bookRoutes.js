import express from "express";
import {
  GetAllBook,
  GetBook
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", GetAllBook); // GET /book
router.get("/:slug", GetBook); // GET /book/:slug

export default router;
