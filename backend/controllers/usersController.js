import db from '../models/index.js';
// Lấy tất cả người dùng
// export async function getAllUsers(req, res) {
//   try {
//     const users = await usersModel.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

import db from "../models/index.js";
import sequelize from "sequelize";

//xem danh sách có phân trang
export async function GetPaged(req, res) {
  try {
    // Lấy query params
    let { page = 1, limit = 10, keyword = "", role_id } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    // Điều kiện where
    let where = {};

    if (keyword) {
      where = {
        ...where,
        [Op.or]: [
          { username: { [sequelize.like]: `%${keyword}%` } },
          { email: { [sequelize.like]: `%${keyword}%` } }
        ]
      };
    }

    // if (role_id) {
    //   where = {
    //     ...where,
    //     role_id: role_id
    //   };
    // }

    const totalRecords = await db.usersModel.count({ where });

    // Lấy danh sách users theo trang
    const users = await db.usersModel.findAll({
      where,
      include: [
        {
          model: db.roleModel,
          as: "UserRole"
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
      data: users
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


// Lấy tất cả user kèm role
export async function getAllUser(req, res) {
  try {
    const users = await db.usersModel.findAll({
      include: [
        {
          model: db.roleModel,
          as: 'UserRole',
          attributes: ['id', 'role']
        }
      ]
    });
    res.json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Lấy user theo id kèm role
export async function getUserById(req, res) {
  try {
    const user = await db.usersModel.findByPk(req.params.id, {
      include: [
        {
          model: db.roleModel,
          as: 'UserRole',
          attributes: ['id', 'role']
        }
      ]
    });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

//test user get all book
export async function UserGetAllBook(req, res) {
  try {
    const books = await db.usersModel.findOne({
      where: { id: 1 },
      include: {
        model: db.bookModel,
        as: "UserBooks"
      }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Test lấy tất cả forum của user id=1
export async function UserGetAllForum(req, res) {
  try {
    const data = await db.usersModel.findOne({
      where: { id: 1 },
      include: {
        model: db.forumModel,
        as: "UserForum"
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


