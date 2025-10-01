import forumModel from "../models/forum.js";

export async function getAllForum(req, res) {
  try {
    const forum = await forumModel.findAll();
    res.json(forum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
