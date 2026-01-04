import express from "express";
import {
  GetPaged,
  getAllCategory,
  createCategory,
  updateStatus,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// 1. Lấy danh sách có phân trang và tìm kiếm (Dùng cho trang quản trị hoặc danh sách thể loại)
// URL ví dụ: /api/categories/paged?page=1&limit=10&keyword=tien-hiep
router.get("/paged", categoryController.GetPaged);

// 2. Lấy tất cả danh mục (Dùng cho dropdown hoặc menu)
router.get("/", categoryController.getAllCategory);

// 3. Tạo mới một thể loại
router.post("/", categoryController.createCategory);

// 4. Cập nhật trạng thái (Duyệt/Hủy duyệt)
// URL ví dụ: /api/categories/status/1 (với body kèm status)
router.put("/status/:id", categoryController.updateStatus);

// 5. Xóa thể loại
router.delete("/:id", categoryController.deleteCategory);

export default router;
