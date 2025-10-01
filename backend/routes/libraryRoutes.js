import express from "express";
import { getAllLibrary } from "../controllers/libraryController.js";

const router = express.Router();
router.get("/", getAllLibrary);

export default router;
