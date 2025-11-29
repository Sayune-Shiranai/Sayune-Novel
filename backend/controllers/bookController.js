import db from '../models/index.js';
import { Op } from "sequelize";
import slugify from "slugify";

function createBookSlug(book_number, title) {
  const BookSlug = `${book_number} ${title}`;
  return slugify(BookSlug, {
    lower: true,
    strict: true
  });
}

export async function GetPaged(req, res) {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let where = {};

    if (keyword.trim() !== "") {
      where = {
        [Op.or]: [
          { book_number: { [Op.like]: `%${keyword}%` } },
          { title: { [Op.like]: `%${keyword}%` } },
          { another_name: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    const totalRecords = await db.bookModel.count({ where });

    // Lấy danh sách book + category theo trang
    const books = await db.bookModel.findAll({
      where,
      include: [
        {
          model: db.categoryModel,
          as: "Book_Category",
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
      data: books
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
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

// // Lấy 1 book (user - category - volumes)
// export async function getOneBook(req, res) {
//   try {
//     const data = await db.bookModel.findOne({
//       where: { id: 1 },
//       include: [
//         { model: db.usersModel, as: "Book_User" },
//         { model: db.categoryModel, as: "Book_Category" },
//         { model: db.volumeModel, as: "Book_Volume" }
//       ]
//     });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


export async function createBook(req, res) {
  try {
    const {
      book_number,
      title,
      another_name,
      author_id,
      artist_id,
      status,
      description,
      user_id,
      category_id
    } = req.body;

    if (!book_number) {
      return res.status(400).json({ error: "Vui lòng nhập số book!" });
    }

    if (!title) {
      return res.status(400).json({ error: "Vui lòng nhập tên book!" });
    }

    const slug = createBookSlug(book_number, title);

    const imgPath = req.file
      ? "/uploads/book/" + req.file.filename
      : "/media/books_images/nocover.jpg";

    // 1. Tạo book
    const newBook = await db.bookModel.create({
      book_number,
      title,
      another_name,
      slug,
      img: imgPath,
      author_id,
      artist_id,
      status,
      description,
      user_id,
    });

    // Chỉ gán category nếu tồn tại và là mảng
    if (Array.isArray(category_id) && category_id.length > 0) {
      await newBook.setBook_Category(category_id);
    }

    return res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



// UPDATE BOOK BY SLUG
export async function updateBook(req, res) {
  try {
    const { slug } = req.params;

    const book = await db.bookModel.findOne({ where: { slug } });
    if (!book) {
      return res.status(404).json({ error: "Không tìm thấy book!" });
    }

    // update slug nếu có sửa title hoặc book_number
    const dataToUpdate = { ...req.body };
    if (req.body.title || req.body.book_number) {
      const newSlug = createBookSlug(
        req.body.book_number || book.book_number,
        req.body.title || book.title
      );
      dataToUpdate.slug = newSlug;
    }

    await book.update(dataToUpdate);

    // update category
    if (Array.isArray(req.body.category_id)) {
      await book.setBook_Category(req.body.category_id);
    }

    return res.json({ message: "Updated", book });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


// Xóa book
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await db.bookModel.findByPk(id);
    if (!book) return res.status(404).json({ error: "Không tìm thấy book!" });

    await book.destroy();

    res.json({ message: "Xóa book thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
