import express from "express";
import { GetPaged } from "../controllers/categoryController.js";

const router = express.Router();
router.get("/", GetPaged);

export default router;
