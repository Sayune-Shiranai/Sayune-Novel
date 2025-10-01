import libraryModel from "../models/library.js";

export async function getAllLibrary(req, res) {
  try {
    const library = await libraryModel.findAll();
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
