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


