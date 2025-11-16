import bookModel from "../models/book.js";
import categoryModel from "../models/category.js";
import slugify from "slugify";

// CREATE BOOK
export async function createBook(req, res) {
  try {
    const {
      book_number,
      title,
      another_name,
      category_ids,
      author,
      artist,
      status,
      description,
      user_id
    } = req.body;

    const slug = slugify(title, { lower: true });

    // Tạo Book
    const newBook = await bookModel.create({
      book_number,
      title,
      another_name,
      slug,
      author,
      artist,
      status,
      description,
      user_id
    });

    // Gắn category (N-N)
    if (Array.isArray(category_ids) && category_ids.length > 0) {
      await newBook.setCategories(category_ids); 
    }

    return res.status(201).json({
      message: "Tạo Book thành công!",
      book: newBook
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server!" });
  }
}



// GET ALL BOOKS
export async function getAllBooks(req, res) {
  try {
    const books = await bookModel.findAll({
      include: {
        model: categoryModel,
        through: { attributes: [] } // Không hiện bảng trung gian
      }
    });

    return res.status(200).json({ books });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server!" });
  }
}



// GET BOOK BY SLUG
export async function getBookBySlug(req, res) {
  try {
    const { slug } = req.params;

    const book = await bookModel.findOne({
      where: { slug },
      include: categoryModel
    });

    if (!book) return res.status(404).json({ message: "Không tìm thấy book!" });

    return res.status(200).json({ book });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server!" });
  }
}



// UPDATE BOOK
export async function updateBook(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      category_ids,
      author,
      artist,
      status,
      description
    } = req.body;

    const book = await bookModel.findByPk(id);

    if (!book) return res.status(404).json({ message: "Book không tồn tại!" });

    // Update
    if (title) book.slug = slugify(title, { lower: true });

    await book.update({
      title: title ?? book.title,
      author,
      artist,
      status,
      description
    });

    // Update category (N-N)
    if (Array.isArray(category_ids)) {
      await book.setCategories(category_ids);
    }

    return res.status(200).json({
      message: "Cập nhật thành công!",
      book
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server!" });
  }
}



// DELETE BOOK
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await bookModel.findByPk(id);

    if (!book) return res.status(404).json({ message: "Book không tồn tại!" });

    await book.destroy();

    return res.status(200).json({ message: "Xóa book thành công!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server!" });
  }
}
