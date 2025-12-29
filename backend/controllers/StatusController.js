import db from '../models/index.js';
import { Op } from "sequelize";

//xem danh sách có phân trang
export async function GetPaged(req, res) {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let where = {};

    if (keyword) {
      where = {
        [Op.or]: [
          { status: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.StatusModel.count({ where });

    // Lấy danh sách status + book theo trang
    const status = await db.StatusModel.findAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Status_Book"
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
      data: status
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}