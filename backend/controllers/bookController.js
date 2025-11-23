import db from '../models/index.js';
import slugify from "slugify";

function createBookSlug(book_number, title) {
  const BookSlug = `${book_number} ${title}`;
  return slugify(BookSlug, {
    lower: true,
    strict: true
  });
}

// Lấy tất cả book
export async function getAllBooks(req, res) {
  try {
    const books = await db.bookModel.findAll({
      include: {
        model: db.categoryModel,
        as: 'Book_Category',
        through: { attributes: [] }
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
        as: 'Book_Category',
        through: { attributes: [] }
      }
    });

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy 1 book (user - category - volumes)
export async function getOneBook(req, res) {
  try {
    const data = await db.bookModel.findOne({
      where: { id: 1 },
      include: [
        { model: db.usersModel, as: "Book_User" },
        { model: db.categoryModel, as: "Book_Category" },
        { model: db.volumeModel, as: "Book_Volume" }
      ]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function createBook(req, res) {
  try {
    const {
      book_number,
      title,
      another_name,
      img,
      author,
      artist,
      status,
      description,
      user_id,
      categoryIds
    } = req.body;

    if (!book_number) {
      return res.status(400).json({ error: "Vui lòng nhập số book!" });
    }

    if (!title) {
      return res.status(400).json({ error: "Vui lòng nhập tên book!" });
    }

    const slug = createBookSlug(book_number, title);

    let imgPath;

    if (!req.file) {
      imgPath = "/media/books_imgages/nocover.jpg";
    } else {
      imgPath = "/uploads/book/" + req.file.filename;
    }

    const newBook = await req.db.bookModel.create(
      {
        book_number,
        title,
        another_name,
        slug,
        img: imgPath,
        author,
        artist,
        status,
        description,
        user_id,
      },
    );

    // nếu có category thì gán vào bảng trung gian
    if (Array.isArray(categoryIds)) {
      await newBook.addCategoryModels(categoryIds, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });

  } catch (err) {
    // await t.rollback();
    return res.status(500).json({ error: err.message });
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
