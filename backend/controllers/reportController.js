import db from '../models/index.js';
const { reportModel, userModel, bookModel, volumeModel } = db;

//report tạo mới để phần người dùng còn lại để qua dashboard 

/*
export async function getAllReport(req, res) {
  try {
    const report = await db.reportModel.findAll();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
  */

// Lấy tất cả báo cáo( có join User + Book + Volume)
export async function getAllReport(req, res) {
  try {
    const reports = await reportModel.findAll({
      include: [
        {
          model: usersModel,
          as: " Report_User",
          attributes: ["id", "username", "email"]
        },
        {
          model: volumeModel,
          as: "Report_Volume",
          attribute: ["id", "title"]
        }
      ],
      order: [["createAt", "DESC"]]
    });

    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Lấy report theo id
export async function getReportById(req, res) {
  try {
    const report = await reportModel.findByPk(req.params.id, {
      include: [
        { model: usersModel, as: "Report_User" },
        { model: bookModel, as: "Report_Book" },
        { model: volumeModel, as: "Report_Volume" },
      ],
    });

    if (!report) return res.status(404).json({ success: false, message: "Report not found" });

    res.json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Tạo một báo cáo
export async function createReport(req, res) {
  try {
    const { user_id, book_id, volume_id, reason } = req.body;

    if (!reason) {
      return res.status(400).json({ success: false, message: "Reason is required" });
    }

    const newReport = await reportModel.create({
      user_id,
      book_id,
      volume_id,
      reason,
    });

    res.status(201).json({ success: true, data: newReport });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Xoá báo cáo
export async function deleteReport(req, res) {
  try {
    const report = await reportModel.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    await report.destroy();
    res.json({ success: true, message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Lấy tất cả báo cáo theo User
export async function getReportByUser(req, res) {
  try {
    const { user_id } = req.params;

    const reports = await reportModel.findAll({
      where: { user_id },
      include: [
        { model: bookModel, as: "Report_Book" },
        { model: volumeModel, as: "Report_Volume" }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
