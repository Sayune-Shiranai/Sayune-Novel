import express from "express";
import {
    getAllVolumeComment
 } from "../../controllers/volumeCommentController.js";

const router = express.Router();
router.get("/", getAllVolumeComment);

export default router;