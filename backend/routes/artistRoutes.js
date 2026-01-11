import express from "express";
import { getBooksByArtist } from "../controllers/artistController.js";

const router = express.Router();
router.get("/:id", getBooksByArtist);

export default router;
