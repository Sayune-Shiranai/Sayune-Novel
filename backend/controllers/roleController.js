import db from '../models/index.js';

// export async function getAllRole(req, res) {
//   try {
//     const role = await roleModel.findAll();
//     res.json(role);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// Lấy tất cả role kèm users
export async function getAllRole(req, res) {
  try {
    const roles = await db.roleModel.findAll({
      include: [
        {
          model: db.usersModel,
          as: 'RoleUser', // trùng với hasMany
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.json({ success: true, data: roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Lấy role theo id kèm users
export async function getRoleById(req, res) {
  try {
    const role = await db.roleModel.findByPk(req.params.id, {
      include: [
        {
          model: db.usersModel,
          as: 'RoleUser',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    res.json({ success: true, data: role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

