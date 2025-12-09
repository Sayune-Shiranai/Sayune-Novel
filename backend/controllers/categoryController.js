import db from "../models/index.js";
import { Op, where } from "sequelize";
// const Category = db.categoryModel;

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
          { category: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.categoryModel.count({ where });

    // Lấy danh sách category + book theo trang
    const category = await db.categoryModel.findAll({
      where,
      include: [
        {
          model: db.bookModel,
          as: "Category_Book",
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
      data: category
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Update category
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await db.categoryModel.findOne({
      where: { id }
    });
    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy category!" });
    }
    if (name) category.name = name;
    if (description) category.description = description;
    await category.save();
    return res.json({
      success: true,
      message: "Cập nhật category thành công!",
      data: category
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

// Lấy tất cả danh mục
export async function getAllCategory(req, res) {
  try {
    const category = await db.categoryModel.findAll();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xoá danh mục
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await db.categoryModel.findOne({
      where: { id }
    });
    if (!category) return res.status(404).json({ success: false, message: 'Không tìm thấy category!' });
    await category.destroy();
    res.json({ success: true, message: 'Xóa category thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Phê duyệt danh mục
export async function approveCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await db.categoryModel.findOne({
      where: { id }
    });
    if (!category) return res.status(404).json({ success: false, message: 'Không tìm thấy category!' });
    category.trangthai = 1;
    await category.save();
    res.json({ success: true, message: 'Đã duyệt', data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Huỷ duyệt danh mục
export async function rejectCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await db.categoryModel.findOne({
      where: { id }
    });
    if (!category) return res.status(404).json({ success: false, message: 'Không tìm thấy category!' });
    category.trangthai = 2;
    await category.save();
    res.json({ success: true, message: 'Hủy duyệt', data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
