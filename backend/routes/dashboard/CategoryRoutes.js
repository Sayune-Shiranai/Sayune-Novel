import express from "express";
import {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/categoryController.js";

const router = express.Router();

// Lấy danh sách tất cả category(hạng mục)
router.get("/", getAllCategory);

// Tạo mới một category
router.post("/create-category", createCategory);

// Lấy category theo id
router.get("/:id", getCategoryById);

// Cập nhật category theo id
router.put("/:id", updateCategory);

// Xoá category theo id
router.delete("/:id", deleteCategory);

// Lấy tất cả category kèm số lượng sách
// router.get("/with-books", getAllCategoryWithBookCount);

export default router;
