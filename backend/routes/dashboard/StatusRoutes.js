import express from "express";

import { 
    GetPaged,
 } from "../../controllers/statusController.js";

const router = express.Router();

router.get("/", GetPaged);

export default router;
