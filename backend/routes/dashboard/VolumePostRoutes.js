import express from "express";
import {
    getAllVolumeComment
 } from "../../controllers/volumePostController.js";

const router = express.Router();
router.get("/", getAllVolumeComment);

export default router;