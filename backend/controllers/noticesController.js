import noticesModel from "../models/notices.js";

export async function getAllNotices(req, res) {
  try {
    const notices = await noticesModel.findAll();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
