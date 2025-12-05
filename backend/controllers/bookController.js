import db from '../models/index.js';
import { Op } from "sequelize";
import slugify from "slugify";
import fs from "fs";
import path from "path";

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

// create book
export async function createBook(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Body rỗng hoặc không hợp lệ!" });
    }

    let {
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

    if (!book_number || isNaN(book_number)) {
      return res.status(400).json({ error: "Vui lòng nhập số book!" });
    }

    const CheckBookNumber = await db.bookModel.findOne({
      where: { book_number }
    });

    if (CheckBookNumber) {
      return res.status(400).json({
        error: `Book number '${book_number}' đã tồn tại!`
      });
    }


    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên book!" });
    }

    const slug = createBookSlug(book_number, title);

    console.log("file info:", req.file);

    const imgPath = req.file
      ? "/media/books_images/" + req.file.filename
      : "/media/books_images/nocover.jpg";

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
      user_id, // fix tự động update theo tk
    });


    let category = [];

    if (Array.isArray(req.body.category_id)) {
      category = req.body.category_id.map(id => parseInt(id, 10));
    } else if (req.body.category_id) {
      category = [parseInt(req.body.category_id, 10)];
    }

    if (category.length > 0) {
      await newBook.setBook_Category(category);
    }


    const Category = await db.bookModel.findOne({
      where: { id: newBook.id },
      include: {
        model: db.categoryModel,
        as: "Book_Category",
        through: { attributes: [] }
      }
    });

    return res.status(201).json({
      message: "Tạo book thành công!",
      // book: newBook,
      Category: Category || []
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


// update book
export async function updateBook(req, res) {
  try {
    const { slug } = req.params;

    const book = await db.bookModel.findOne({ where: { slug } });
    if (!book) {
      return res.status(404).json({ error: "Không tìm thấy book!" });
    }

    let {
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

    if (!book_number || isNaN(book_number)) {
      return res.status(400).json({ error: "Vui lòng nhập số book!" });
    }

    if(!title || title.trim() === "") {
      return res.status(400).json({ error: "Vui lòng nhập tên book!" });
    }

    let newSlug = book.slug;

    if (title || book_number) {
      newSlug = createBookSlug(
        book_number || book.book_number,
        title || book.title
      );
    }

    let imgPath = req.file;

    if (req.file) {
      const oldImgPath = path.join(process.cwd(), book.img);
      console.log("oldImg:", oldImgPath);

      // không xoá ảnh mặc định
      if (
        fs.existsSync(oldImgPath) &&
        book.img !== "/media/books_images/nocover.jpg"
      ) {
        fs.unlinkSync(oldImgPath);
      }

      imgPath = "/media/books_images/" + req.file.filename;
      console.log("imgPath:", imgPath);
    }

    await book.update({
      book_number: book_number ?? book.book_number,
      title: title ?? book.title,
      another_name: another_name ?? book.another_name,
      slug: newSlug,
      img: imgPath,
      author_id: author_id ?? book.author_id,
      artist_id: artist_id ?? book.artist_id,
      status: status ?? book.status,
      description: description ?? book.description,
      user_id: user_id ?? book.user_id, // fix tự động update theo tk up book
    });


    if (category_id) {
      let categories = [];

      if (Array.isArray(category_id)) {
        categories = category_id.map(id => parseInt(id));
      } else {
        categories = [parseInt(category_id)];
      }

      await book.setBook_Category(categories);
    }

    const updatedBook = await db.bookModel.findOne({
      where: { id: book.id },
      include: [
        {
          model: db.categoryModel,
          as: "Book_Category",
          through: { attributes: [] }
        }
      ]
    });

    return res.json({
      message: "Cập nhật book thành công!",
      updatedBook
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// delete book
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await db.bookModel.findOne({
      where: { id }
    });
    if (!book) return res.status(404).json({ error: "Không tìm thấy book!" });

    await book.destroy();

    res.json({ message: "Xóa book thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function approveBook(req, res) {
  try {
    const { id } = req.params;
    const book = await db.bookModel.findOne({
      where: { id }
    });
    if (!book) return res.status(404).json({ success: false, message: 'Không tìm thấy book!' });

    book.trangthai = 1;
    await book.save();

    res.json({ success: true, message: 'Đã duyệt', data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function rejectBook(req, res) {
  try {
    const { id } = req.params;
    const book = await db.bookModel.findOne({
      where: { id }
    });
    if (!book) return res.status(404).json({ success: false, message: 'Không tìm thấy book!' });

    book.trangthai = 2;
    await book.save();

    res.json({ success: true, message: 'Hủy duyệt', data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
