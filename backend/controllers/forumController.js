import forumModel from "../models/forum.js";
import db from "../models/index.js";

// 1. Lấy danh sách 
export async function getAllForum(req, res) {
  try {
    const forum = await forumModel.findAll();
    res.json(forum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 2. Lấy chi tiết một chủ đề (theo ID)
export async function getForumById(req, res) {
  try {
    const { id } = req.params;
    // Lưu ý: Nếu dùng Sequelize là findByPk, nếu dùng Mongoose là findById
    const forum = await forumModel.findByPk(id); 

    if (!forum) {
      return res.status(404).json({ message: "Không tìm thấy bài viết này." });
    }
    res.json(forum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//test
export async function ForumGetUser(req, res) {
  try {
    const data = await db.forumModel.findAll({
      include: {
        model: db.usersModel,
        as: "ForumUser",
        attributes: ["id", "username", "img_avatar"]
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 3. Tạo chủ đề mới (Thread)
export async function createForum(req, res) {
  try {
    // Giả sử req.user.id có được từ middleware xác thực
    const { title, content } = req.body; 
    const userId = req.user?.id; // Hoặc req.body.userId nếu chưa làm Auth

    if (!title || !content) {
      return res.status(400).json({ message: "Tiêu đề và nội dung không được để trống." });
    }

    const newForum = await forumModel.create({
      title,
      content,
      userId, 
      // Các trường khác như createdAt thường tự động
    });

    res.status(201).json(newForum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 4. Cập nhật chủ đề
export async function updateForum(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.id;

    // Tìm bài viết trước
    const forum = await forumModel.findByPk(id);

    if (!forum) {
      return res.status(404).json({ message: "Không tìm thấy bài viết." });
    }

    // Kiểm tra quyền (chỉ người tạo mới được sửa - nếu cần)
    // if (forum.userId !== userId) return res.status(403).json("Không có quyền sửa.");

    // Thực hiện update
    
    await forum.update({ title, content });
    
    // Hoặc nếu ORM khác: await forumModel.update({ title, content }, { where: { id } });

    res.json({ message: "Cập nhật thành công", data: forum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 5. Xóa chủ đề
export async function deleteForum(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const forum = await forumModel.findByPk(id);

    if (!forum) {
      return res.status(404).json({ message: "Không tìm thấy bài viết." });
    }

    // Kiểm tra quyền
    // if (forum.userId !== userId) return res.status(403).json("Không có quyền xóa.");

    await forum.destroy(); // Hoặc forumModel.destroy({ where: { id } });

    res.json({ message: "Đã xóa bài viết thành công." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}