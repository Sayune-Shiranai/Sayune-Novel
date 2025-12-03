import express from "express";

import { 
    GetPaged,
    createArtist,
    updateArtist,
    deleteArtist
 } from "../../controllers/artistController.js";

const router = express.Router();

router.get("/", GetPaged);
router.post("/create", createArtist);
router.post("/update/:id", updateArtist);
router.delete("/delete/:id", deleteArtist);

export default router;
