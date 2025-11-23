import db from "../models/index.js";

export async function getAllVolume(req, res) {
  try {
    const volume = await db.volumeModel.findAll();
    res.json(volume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOneVolume(req, res) {
  try {
    const volume = await db.volumeModel.findOne({
      where: { id: 1 },
      include: [
        {
          model: db.bookModel,
          as: "Volume_Book"
        },
        {
          model: db.usersModel,
          as: "Volume_User"
        }
      ]
    });

    if (!volume) {
      return res.status(404).json({ message: "Volume không tồn tại" });
    }

    res.json(volume);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

