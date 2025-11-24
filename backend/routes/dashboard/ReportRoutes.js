import express from "express";
import {
    getAllReport,
    getReportById,
    createReport,
    deleteReport,
    getReportByUser,
} from "../../controllers/reportController.js";

const router = express.Router();

router.get("/", getAllReport);// Lấy tất cả báo cáo( có join User + Book + Volume)

router.get("/:id", getReportById);// Lấy report theo id

router.get("/user/:user_id", getReportByUser);// Lấy tất cả báo cáo theo User

router.post("/", createReport);// Tạo một báo cáo

router.delete("/:id", deleteReport);// Xoá báo cáo

export default router;