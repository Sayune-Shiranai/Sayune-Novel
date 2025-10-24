import volumeModel from "../models/volume.js";

export async function getAllVolume(req, res) {
  try {
    const volume = await volumeModel.findAll();
    res.json(volume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
