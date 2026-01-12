import express from "express";
import { 
    GetPaged,
    GetVolumeBySlug
} from "../controllers/volumeController.js";

const router = express.Router();
router.get("/", GetPaged);
router.get("/:slug/volume-:volume_number", GetVolumeBySlug); // /book/:slug/volume-:volume_number

export default router;
