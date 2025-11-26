import db from "../models/index.js";

export async function getAllVolumePost(req, res) {
  try {
    const VolumePost = await db.VolumePostModel.findAll();
    res.json(VolumePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
