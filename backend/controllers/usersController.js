import usersModel from "../models/users.js";

export async function getAllUsers(req, res) {
  try {
    const users = await usersModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
