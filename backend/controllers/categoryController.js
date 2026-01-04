import db from "../models/index.js";
import { Op } from "sequelize";

const Category = db.categoryModel;

// 1. Xem danh sách có phân trang và tìm kiếm
export async function GetPaged(req, res) {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let where = {};
    if (keyword) {
      // Khớp với cột 'category' trong Model của bạn
      where.category = { [Op.like]: `%${keyword}%` };
    }

    // Sử dụng findAndCountAll để lấy cả count và rows trong 1 lần query
    const { count, rows } = await Category.findAndCountAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Category_Book", // Khớp với alias trong associate của Model
          through: { attributes: [] }
        }
      ],
      limit,
      offset,
      order: [["id", "DESC"]],
      distinct: true
    });

    return res.json({
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      data: rows
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// 2. Lấy tất cả danh mục
export async function getAllCategory(req, res) {
  try {
    const data = await Category.findAll({
      order: [['category', 'ASC']]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 3. Tạo mới category (Đã sửa lỗi tên biến)
export async function createCategory(req, res) {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ success: false, message: "Tên category là bắt buộc!" });
    }

    // SỬA: Kiểm tra dựa trên cột 'category'
    const existed = await Category.findOne({ where: { category } });
    if (existed) {
      return res.status(400).json({ success: false, message: "Category đã tồn tại!" });
    }

    const newCategory = await Category.create({
      category: category,
      trangthai: 0 // 0 = chờ duyệt theo DB thiết kế
    });

    return res.status(201).json({
      success: true,
      message: "Tạo mới category thành công!",
      data: newCategory
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

// 4. Xoá danh mục
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy category!' });

    res.json({ success: true, message: 'Xóa category thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// 5. Phê duyệt/Hủy duyệt (Gộp chung logic cho gọn)
export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // Client gửi status 1 hoặc 2

    const item = await Category.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy!' });

    item.trangthai = status;
    await item.save();

    res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}