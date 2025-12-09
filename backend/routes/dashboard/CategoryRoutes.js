import express from "express";
import {
  GetPaged,
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/categoryController.js";

const router = express.Router();

// Lấy danh sách tất cả category(hạng mục)
router.get("/", GetPaged);

// Route để cập nhật category
router.put('/:id', updateCategory);

// Route để xóa category
router.delete('/:id', deleteCategory);

// Route để duyệt category
router.put('/approve/:id', approveCategory);

// Route để hủy duyệt category
router.put('/reject/:id', rejectCategory);

// Route để lấy tất cả categories
router.get('/', getAllCategories);


export default router;
