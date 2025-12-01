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

    // Lấy danh sách book + artist theo trang
    const artist = await db.bookModel.findAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Book_Artist",
          through: { attributes: [] } 
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