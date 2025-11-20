import express from "express";
import { 
    getOneVolume,
    getAllVolume 
} from "../../controllers/VolumeController.js";

const router = express.Router();
router.get("/test-volume", getOneVolume);
router.get("/", getAllVolume);

export default router;
