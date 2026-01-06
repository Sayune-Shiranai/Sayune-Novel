import db from "../models/index.js";

export async function getProfile(req, res) {
  try {
    console.log("req.user trong getProfile:", req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Chưa đăng nhập!" });
    }

    const user = await db.usersModel.findOne({
      where: { id: req.user.id }
    });

    console.log("Profile User:", user)
    
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        role: req.user.role,
      }
    });

  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({
      message: "Lấy thông tin người dùng thất bại!"
    });
  }
}
