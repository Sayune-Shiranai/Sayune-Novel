import chaptersModel from "../models/chapters.js";

export async function getAllChapters(req, res) {
  try {
    const chapters = await chaptersModel.findAll();
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
