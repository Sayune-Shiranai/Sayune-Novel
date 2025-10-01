import categoryModel from "../models/category.js";

export async function getAllCategory(req, res) {
  try {
    const category = await categoryModel.findAll();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
