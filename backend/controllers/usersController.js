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
          { username: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.usersModel.count({ where });

    // Lấy danh sách users theo trang
    const users = await db.usersModel.findAll({
      where,
      include: [
        {
          model: db.roleModel,
          as: "User_Role"
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

// // Lấy user theo id
// export async function GetById(req, res) {
//   try {
//     const user = await db.usersModel.findByPk(req.params.id);

//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     res.json({ success: true, data: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }

// export async function createUser(req, res) {
//   try {
//     const { username, email, password, role_id } = req.body;
    
//     const newUser = await db.usersModel.create({
//       username,
//       email,
//       password,
//       role_id
//     });
    
//     return res.status(201).json({
//       success: true,
//       message: "Tạo người dùng thành công!",
//       data: newUser
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// }

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email, role_id } = req.body;

    const user = await db.usersModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy user!" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role_id) user.role_id = role_id;

    await user.save();

    return res.json({
      success: true,
      message: "Cập nhật user thành công!",
      data: user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}


export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await db.usersModel.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy user!' });

    await user.destroy();
    res.json({ success: true, message: 'Xóa user thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}


export async function approveUser(req, res) {
  try {
    const { id } = req.params;
    const user = await db.usersModel.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy user!' });

    user.trangthai = 1;
    await user.save();

    res.json({ success: true, message: 'Đã duyệt', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function rejectUser(req, res) {
  try {
    const { id } = req.params;
    const user = await db.usersModel.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy user!' });

    user.trangthai = 2;
    await user.save();

    res.json({ success: true, message: 'Hủy duyệt', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// // Lấy tất cả người dùng
// export async function getAllUsers(req, res) {
//   try {
//     const users = await db.usersModel.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


// //test user get all book
// export async function UserGetAllBook(req, res) {
//   try {
//     const books = await db.usersModel.findOne({
//       where: { id: 1 },
//       include: {
//         model: db.bookModel,
//         as: "User_Book"
//       }
//     });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// // Test lấy tất cả forum của user id=1
// export async function UserGetAllForum(req, res) {
//   try {
//     const data = await db.usersModel.findOne({
//       where: { id: 1 },
//       include: {
//         model: db.forumModel,
//         as: "User_Forum"
//       }
//     });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


