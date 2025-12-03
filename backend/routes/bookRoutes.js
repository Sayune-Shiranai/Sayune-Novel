import express from "express";
import {
  GetPaged
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", GetPaged); // GET /book

export default router;
