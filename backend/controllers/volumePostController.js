import db from "../models";

export async function getAllVolumePost(req, res) {
  try {
    const VolumePost = await db.VolumePostModel.findAll();
    res.json(VolumePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
