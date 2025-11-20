import db from '../models/index.js';

// Lấy tất cả book
export async function getAllBooks(req, res) {
  try {
    const books = await db.bookModel.findAll({
      include: {
        model: db.categoryModel,
        as: 'BookCategory',
        through: { attributes: [] } // Ẩn bảng trung gian
      }
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy book theo slug
export async function getBookBySlug(req, res) {
  try {
    const { slug } = req.params;

    const book = await db.bookModel.findOne({
      where: { slug },
      include: {
        model: db.categoryModel,
        as: 'BookCategory',
        through: { attributes: [] }
      }
    });

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Tạo book
export async function createBook(req, res) {
  try {
    const { title, book_number, slug, categoryIds } = req.body;

    if (!title || !book_number) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = await db.bookModel.create({ ...req.body });

    // Gán categories nếu có
    if (Array.isArray(categoryIds)) {
      await newBook.setCategoryModels(categoryIds); 
    }

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE BOOK BY SLUG
export async function updateBookBySlug(req, res) {
  try {
    const { slug } = req.params;

    const book = await db.bookModel.findOne({ where: { slug } });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Cập nhật dữ liệu
    await book.update(req.body);

    // Nếu có categoryIds thì update quan hệ many-to-many
    if (Array.isArray(req.body.categoryIds)) {
      await book.setCategoryModels(req.body.categoryIds);
    }

    res.json({ message: "Updated", book });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Xóa book
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await db.bookModel.findByPk(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
