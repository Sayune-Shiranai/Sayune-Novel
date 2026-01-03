import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";

import { 
    GetPaged,
    createRole,
    updateRole,
    deleteRole
} from "../../controllers/roleController.js";

const router = express.Router();

router.get("/",verifyToken, GetPaged);
router.post("/create", createRole);
router.post("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

export default router;
