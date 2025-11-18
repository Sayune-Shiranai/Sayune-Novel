import { book, category } from "../models/BookCategory.js";

class BookController {

  // GET ALL BOOKS
  async getAll(req, res) {
    try {
      const books = await book.findAll({
        include: {
          model: category,
          through: { attributes: [] }
        }
      });
      return res.json({ books });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // GET BOOK BY SLUG
  async getBySlug(req, res) {
    try {
      const { slug } = req.params;

      const result = await book.findOne({
        where: { slug },
        include: category
      });

      if (!result) return res.status(404).json({ message: "Không tìm thấy" });

      return res.json({ book: result });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // CREATE BOOK
  async create(req, res) {
    try {
      const { title, slug, description, categoryIds } = req.body;

      const newBook = await book.create({ title, slug, description });

      if (categoryIds && Array.isArray(categoryIds)) {
        await newBook.setCategories(categoryIds);
      }

      return res.json({ message: "Tạo thành công", newBook });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // UPDATE BOOK
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, slug, description, categoryIds } = req.body;

      const current = await book.findByPk(id);
      if (!current) return res.status(404).json({ message: "Không tìm thấy" });

      await current.update({ title, slug, description });

      if (categoryIds) {
        await current.setCategories(categoryIds);
      }

      return res.json({ message: "Cập nhật thành công" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // DELETE BOOK
  async delete(req, res) {
    try {
      const { id } = req.params;

      const current = await book.findByPk(id);
      if (!current) return res.status(404).json({ message: "Không tìm thấy" });

      await current.destroy();
      return res.json({ message: "Xóa thành công" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new BookController();
