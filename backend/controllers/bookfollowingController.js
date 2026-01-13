import db from '../models/index.js';
import { Op, where } from "sequelize";

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
          { book_number: { [Op.like]: `%${keyword}%` } },
          { title: { [Op.like]: `%${keyword}%` } },
          { another_name: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.bookModel.count({ where });

    const bookfollowing = await db.bookModel.findAll({
      where,
      include: [
        {
          model: db.usersModel,
          as: "Book_Follow_User",
          through: { attributes: [] } 
        },
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
      data: bookfollowing
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function GetAllUserFollowBook(req, res) {
  try {
    const { slug } = req.params;

    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const userWhere = {};
    if (keyword.trim()) {
      userWhere.username = { [Op.like]: `%${keyword}%` };
    }
    const totalRecords = await db.usersModel.count({
      where: userWhere,
      distinct: true,
      include: [
        {
          model: db.bookModel,
          as: "User_Follow_Book",
          where: { slug },
          through: { attributes: [] }
        }
      ]
    });

    const users = await db.usersModel.findAll({
      where: userWhere,
      include: [
        {
          model: db.bookModel,
          as: "User_Follow_Book",
          where: { slug },
          attributes: ["id", "title", "slug"],
          through: { attributes: [] }
        }
      ],
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return res.json({
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
      data: users
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// lấy tất cả book đã theo dõi của user
export async function GetMyFollowedBooks(req, res) {
  try {
    const userId = req.user.id;

    const user = await db.usersModel.findOne({
      where: { id: userId },
      include: [
        {
          model: db.bookModel,
          as: "User_Follow_Book",
          through: { attributes: [] }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
