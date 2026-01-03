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
          { role: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.roleModel.count({ where });

    // Lấy danh sách role + user theo trang
    const role = await db.roleModel.findAll({
      where,
      include: [
        {
          model: db.usersModel,
          as: "Role_User"
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
      data: role
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// create role
export async function createRole(req, res) {
  try {
    const { role } = req.body;

    if (!role || role.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên role!" });
    }

    const checkRole = await db.roleModel.findOne({
      where: { role }
    });

    if (checkRole) {
      return res.status(400).json({
        success: false,
        message: "Role đã tồn tại!"
      });
    }

    const newRole = await db.roleModel.create({ role });

    return res.status(201).json({
      message: "Tạo role thành công!",
      role: newRole
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// update role
export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || role.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập role!" });
    }

    const CheckRole = await db.roleModel.findOne({
      where: { id }
    });

    if (!CheckRole) {
      return res.status(404).json({ error: "Không tìm thấy role" });
    }

  await CheckRole.update({ role });

    return res.json(CheckRole);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// delete role
export async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const role = await db.roleModel.findOne(
      { where: { id } }
    );
    if (!role) {
      return res.status(404).json({ error: "Không tìm thấy role!" });
    }

    const userCount = await db.usersModel.count({
      where: { role_id: id }
    });

    if (userCount > 0) {
      return res.status(400).json({
        error: "Không thể xóa vai trò đang được sử dụng!"
      });
    }

    await role.destroy();
    return res.json({ message: "Xóa role thành công!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

