import express from "express";

import { 
    GetPaged
 } from "../../controllers/artistController.js";

const router = express.Router();

router.get("/", GetPaged);

export default router;
