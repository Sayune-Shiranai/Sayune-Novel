import express from "express";
import upload from "../../middleware/upload.js";

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
router.get("/:slug/", GetPaged);  //dashboard/book/:slug
router.post("/:slug/create", upload.array("chapter_content"), createVolume);    //dashboard/book/:slug/create
router.post("/:slug/delete/:id", deleteVolume);   //dashboard/book/:slug/create/:id
router.post("/:slug/approve/:id", approveVolume); //dashboard/book/:slug/approve/:id
router.post("/:slug/reject/:id", rejectVolume);   //dashboard/book/:slug/reject/:id



export default router;
