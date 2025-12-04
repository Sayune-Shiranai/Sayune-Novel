import express from "express";
import { 
    GetPaged,
    createVolume,
    deleteVolume,
    approveVolume,
    rejectVolume
} from "../../controllers/volumeController";

const router = express.Router();
router.get("/", GetPaged); //dashboard/book/:slug
router.get("/create", createVolume) //dashboard/book/:slug/create
router.post("/delete/:id", deleteVolume);
router.post("/approve/:id", approveVolume);
router.post("/reject/:id", rejectVolume);


export default router;
