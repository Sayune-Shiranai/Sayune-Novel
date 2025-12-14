import db from "../models/notices.js";
import { Op } from "sequelize";

//Lấy tất cả notice
export async function getAllNotices(req, res) {
  try {
    const notices = await noticesModel.findAll();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy chi tiết notice theo id
export async function getNoticeById(req, res) {
  try {
    const { id } = req.params;
    const notice = await noticesModel.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Tạo mới một notice
export async function createNotice(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const newNotice = await noticesModel.create({ title, content });
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật một notice theo id
export async function updateNotice(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const notice = await noticesModel.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    notice.title = title || notice.title;
    notice.content = content || notice.content;
    await notice.save();
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xóa một notice theo id
export async function deleteNotice(req, res) {
  try {
    const { id } = req.params;
    const notice = await noticesModel.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    await notice.destroy();
    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Gửi thông báo tới user select hoặc ALL follower của truyện
export const sendNotice = async (req, res) => {
  try {
    const {
      title,
      content,
      userIds,
      bookId,
      sendAllFollower
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Thiếu title hoặc content"
      });
    }

    let targetUsers = [];

    // Gửi ALL user theo dõi truyện
    if (sendAllFollower && bookId) {
      const follows = await db.FollowBook.findAll({
        where: { bookId }
      });

      targetUsers = follows.map(f => f.userId);

      if (targetUsers.length === 0) {
        return res.status(400).json({
          message: "Truyện này chưa có user theo dõi"
        });
      }
    }
    // Gửi cho user được chọn
    else if (Array.isArray(userIds) && userIds.length > 0) {
      targetUsers = userIds;
    } else {
      return res.status(400).json({
        message: "Chưa chọn user hoặc follower"
      });
    }

    const noticesData = targetUsers.map(userId => ({
      title,
      content,
      userId,
      isRead: false
    }));

    await db.notices.bulkCreate(noticesData);

    return res.json({
      message: "Gửi thông báo thành công",
      total: noticesData.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi gửi thông báo"
    });
  }
};