import express from "express";
import {
  GetPaged,
  getAllCategory,
  createCategory,
  approveCategory,
  deleteCategory,
  rejectCategory,
} from "../../controllers/categoryController.js";

const router = express.Router();

// Tạo mới category
router.post("/create", createCategory);

// Lấy danh sách tất cả category(hạng mục)
router.get("/", GetPaged);

// Route để xóa category
router.delete('/:id', deleteCategory);

// Route để duyệt category
router.put('/approve/:id', approveCategory);

// Route để hủy duyệt category
router.put('/reject/:id', rejectCategory);

// Route để lấy tất cả categories
router.get('/', getAllCategory);


export default router;
