import volumeCommentModel from "../models/volumeComment.js";

export async function getAllVolumeComment(req, res) {
  try {
    const volumeComment = await volumeCommentModel.findAll();
    res.json(volumeComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
