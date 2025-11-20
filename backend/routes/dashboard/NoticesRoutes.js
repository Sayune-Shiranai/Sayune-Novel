import express from "express";
import {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../../controllers/noticesController.js";

const router = express.Router();

// Lấy danh sách tất cả notices
router.get("/", getAllNotices);

// Lấy chi tiết notice theo id
router.get("/:id", getNoticeById);

// Tạo mới notice
router.post("/", createNotice);

// Cập nhật notice theo id
router.put("/:id", updateNotice);

// Xóa notice theo id
router.delete("/:id", deleteNotice);

export default router