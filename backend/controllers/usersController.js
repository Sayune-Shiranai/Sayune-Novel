import usersModel from "../models/users.js";

// Lấy tất cả người dùng
export async function getAllUsers(req, res) {
  try {
    const users = await usersModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
