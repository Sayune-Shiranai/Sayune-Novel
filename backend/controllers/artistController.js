import db from '../models/index.js';
import { Op } from "sequelize";

export async function GetPaged(req, res) {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let where = {};

    if (keyword.trim() !== "") {
      where = {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
        ]
      };
    }

    const totalRecords = await db.bookModel.count({ where });

    // Lấy danh sách artist + book theo trang
    const artist = await db.bookModel.findAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Book_Artist"
        }
      ],
      limit,
      offset,
      order: [["id", "DESC"]]
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return res.json({
      page,
      limit,
      totalPages,
      totalRecords,
      data: artist
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// create artist
export async function createArtist(req, res) {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên artist!" });
    }
    const newArtist = await db.artistModel.create({ name });
    return res.status(201).json({ message: "Tạo artist thành công!", artist: newArtist });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// update artist
export async function updateArtist(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên artist!" });
    }

    const artist = await db.artistModel.findOne(
      { where: { id } }
    );

    if (!artist) {
      return res.status(404).json({ error: "Không tìm thấy artist!" });
    }

    await artist.update({ name });
    return res.json({ message: "Cập nhật artist thành công!", artist });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// delete artist
export async function deleteArtist(req, res) {
  try {
    const { id } = req.params;
    const artist = await db.artistModel.findOne(
      { where: { id } }
    );
    if (!artist) {
      return res.status(404).json({ error: "Không tìm thấy artist!" });
    }
    await artist.destroy();
    return res.json({ message: "Xóa artist thành công!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}