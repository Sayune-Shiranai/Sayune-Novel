import userModel from "../models/user.js";

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
