import roleModel from "../models/role.js";

export async function getAllRole(req, res) {
  try {
    const role = await roleModel.findAll();
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
