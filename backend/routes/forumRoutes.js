import express from "express";
import { 
  getAllForum, 
  getForumById, 
  createForum, 
  updateForum, 
  deleteForum 
} from "../controllers/forumController.js";

// Nếu bạn có middleware xác thực (để chặn người chưa đăng nhập), hãy import vào đây
// import { verifyToken } from "../middlewares/auth.js"; 

const router = express.Router();

// 1. Lấy danh sách tất cả chủ đề
router.get("/", getAllForum);

// 2. Xem chi tiết một chủ đề theo ID
router.get("/:id", getForumById);

// 3. Tạo chủ đề mới (Thường cần đăng nhập mới được tạo)
// Nếu có middleware auth: router.post("/", verifyToken, createForum);
router.post("/", createForum);

// 4. Cập nhật chủ đề theo ID
router.put("/:id", updateForum);

// 5. Xóa chủ đề theo ID
router.delete("/:id", deleteForum);

export default router;