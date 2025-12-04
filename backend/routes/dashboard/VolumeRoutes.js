import express from "express";
import { 
    GetPaged,
    createVolume,
    deleteVolume,
    approveVolume,
    rejectVolume
} from "../../controllers/volumeController";

const router = express.Router();
router.get("/", GetPaged);  //dashboard/book/:slug
router.get("/create", createVolume);    //dashboard/book/:slug/create
router.post("/delete/:id", deleteVolume);   //dashboard/book/:slug/create/:id
router.post("/approve/:id", approveVolume); //dashboard/book/:slug/approve/:id
router.post("/reject/:id", rejectVolume);   //dashboard/book/:slug/reject/:id


export default router;
