import express from "express";

import {
  getAllChatbox,
  createChatbox,
  getChatboxById,
  updateChatbox,
  deleteChatbox,
} from "../../controllers/chatboxController.js";

const router = express.Router();

// Lấy tất cả chatbox
router.get("/", getAllChatbox);

// Tạo mới chatbox
router.post("/", createChatbox);

// Lấy chi tiết chatbox theo id
router.get("/:id", getChatboxById);

// Cập nhật chatbox theo id
router.put("/:id", updateChatbox);

// Xóa chatbox theo id
router.delete("/:id", deleteChatbox);

export default router;