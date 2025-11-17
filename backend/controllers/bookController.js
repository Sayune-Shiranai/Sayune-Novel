import BookService from "../services/BookService.js";

class BookController {

  async getAll(req, res) {
    try {
      const books = await BookService.getAllBooks();
      return res.json({ books });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      const book = await BookService.getBookBySlug(slug);

      if (!book) return res.status(404).json({ message: "Không tìm thấy" });

      return res.json({ book });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  async create(req, res) {
    try {
      const newBook = await BookService.createBook(req.body);
      return res.json({ message: "Tạo thành công", newBook });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await BookService.updateBook(id, req.body);

      if (!result) return res.status(404).json({ message: "Không tìm thấy" });

      return res.json({ message: "Cập nhật thành công" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await BookService.deleteBook(id);

      if (!result) return res.status(404).json({ message: "Không tìm thấy" });

      return res.json({ message: "Xóa thành công" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new BookController();
