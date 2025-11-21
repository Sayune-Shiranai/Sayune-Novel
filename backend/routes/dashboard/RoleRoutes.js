import express from "express";

import { getAllRole, getRoleById } from "../controllers/roleController.js";

const router = express.Router();

// Lấy danh sách tất cả role kèm users
router.get("/", getAllRole);

// Lấy role theo id kèm users
router.get("/:id", getRoleById);

export default router;
