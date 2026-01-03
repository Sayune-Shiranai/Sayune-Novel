import express from "express";
import upload from "../../middleware/upload.js";
import { verifyToken } from "../../middleware/verifyToken.js";

import { 
    GetPaged,
    createVolume,
    deleteVolume,
    approveVolume,
    rejectVolume
} from "../../controllers/volumeController.js";

const router = express.Router();

// router.use((req, res, next) => {
//   console.log("Params router:", req.params);
//   next();
// });
router.get("/:slug/volume", GetPaged);  //dashboard/book/:slug
router.post("/:slug/volume/create", upload.array("chapter_content"), verifyToken, createVolume);    //dashboard/book/:slug/create
router.delete("/:slug/volume/delete/:id", deleteVolume);   //dashboard/book/:slug/create/:id
router.post("/:slug/approve/:id", approveVolume); //dashboard/book/:slug/approve/:id
router.post("/:slug/reject/:id", rejectVolume);   //dashboard/book/:slug/reject/:id



export default router;
