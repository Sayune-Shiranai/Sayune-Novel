import express from "express";
import {
    getAllVolumePost
 } from "../../controllers/volumePostController.js";

const router = express.Router();
router.get("/", getAllVolumePost);

export default router;