import express from "express";

import { 
    GetPaged,
    createRole,
    updateRole,
    deleteRole
} from "../../controllers/roleController.js";

const router = express.Router();

router.get("/", GetPaged);
router.post("/create", createRole);
router.post("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

export default router;
