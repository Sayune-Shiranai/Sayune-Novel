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

    // Lấy danh sách book + author theo trang
    const author = await db.authorModel.findAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Author_Book"
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
      data: author
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// create author
export async function createAuthor(req, res) {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên author!" });
    }
    const newAuthor = await db.authorModel.create({ name });
    return res.status(201).json({ message: "Tạo author thành công!", author: newAuthor });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// update author
export async function updateAuthor(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên author!" });
    }
    const author = await db.authorModel.findOne({
      where: { id }
    });
    if (!author) {
      return res.status(404).json({ error: "Không tìm thấy author!" });
    }
    
    await author.update({ name });
    return res.json({ message: "Cập nhật author thành công!", author });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// đelete author
export async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;
    const artist = await db.authorModel.findOne(
      { where: { id } }
    );
    if (!artist) {
      return res.status(404).json({ error: "Không tìm thấy author!" });
    }
    await artist.destroy();
    return res.json({ message: "Xóa author thành công!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}