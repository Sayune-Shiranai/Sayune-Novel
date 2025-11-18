import categoryModel from "../models/category.js";

// Lấy tất cả danh mục
export async function getAllCategory(req, res) {
  try {
    const category = await categoryModel.findAll();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Tạo mới một danh mục
   export async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newCategory = await categoryModel.create({
      name,
      description,
    });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy chi tiết một danh mục theo id
export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//Cập nhật danh mục theo id
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//Xoá danh mục theo id
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}