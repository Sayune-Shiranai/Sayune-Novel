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
        },
        {
          model: db.authorModel,
          as: "Book_Author",
          attributes: ["id", "name"]
        },
        {
          model: db.artistModel,
          as: "Book_Artist",
          attributes: ["id", "name"]
        },
        {
          model: db.StatusModel,
          as: "Book_Status",
          attributes: ["id", "name"]
        },
        {
          model: db.usersModel,
          as: "Book_User",
          attributes: ["id", "username"]
        },
        {
          model: db.volumeModel,
          as: "Book_Volume",
          attributes: ["id"]
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
      user_id: req.user.id || null,
      trangthai: '1',
    });

    console.log("book_user:", req.user.id)


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
      trangthai: '1',
      user_id: req.user.id,
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

    await db.volumeModel.destroy({
      where: { book_id: id }
    });

    await book.setBook_Category([]);

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

// Lấy tất cả book (không lấy book có status = 2)
export async function GetAllBook(req, res) {
  try {
    const books = await db.bookModel.findAll({
      where: {
        trangthai: {
          [Op.ne]: 2
        }
      },
      order: [["id", "DESC"]]
    });

    return res.json({
      success: true,
      data: books
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//Lấy thông tất cả thông tin book và các bảng liên quan
export async function GetBook(req, res) {
  try {
    const { slug } = req.params;
    const book = await db.bookModel.findAll({
      where: { slug },
      include: [
        {
          model: db.categoryModel,
          as: "Book_Category",
          through: { attributes: [] } 
        },
        {
          model: db.authorModel,
          as: "Book_Author",
          attributes: ["id", "name"]
        },
        {
          model: db.artistModel,
          as: "Book_Artist",
          attributes: ["id", "name"]
        },
        {
          model: db.StatusModel,
          as: "Book_Status",
          attributes: ["id", "name"]
        },
        {
          model: db.volumeModel,
          as: "Book_Volume",
          attributes: ["volume_number", "title"],
          order: [["volume_number", "ASC"]]
        }
      ],
    });

    return res.json({
      success: true,
      data: book
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function GetBookCreateByUser(req, res) {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({
        message: "Chưa đăng nhập"
      });
    }

    const books = await db.bookModel.findAll({
      where: {
        user_id: user,
        trangthai: {
          [Op.ne]: 2
        }
      },
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Lấy danh sách truyện của user thành công",
      data: books
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function FollowBook(req, res) {
  try {
    const user = req.user.id;
    const { slug } = req.params;

    const book = await db.bookModel.findOne({
      where: { slug }
    });

    if (!book) {
      return res.status(404).json({
        message: "Sách không tồn tại"
      });
    }

    const checkFollow = await db.FollowBookModel.findOne({
      where: { user_id: user, book_id: book.id}
    })

    if(checkFollow) {
      return res.status(400).json({
        message: "Bạn đã follow sách này rồi"
      });
    }

    await db.FollowBookModel.create({
      user_id: user,
      book_id: book.id
    });
    return res.json({ message: "Follow thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function UnfollowBook(req, res) {
  try {
    const user = req.user.id;
    const { slug } = req.params;

    const book = await db.bookModel.findOne({
      where: { slug }
    });

    if (!book) {
      return res.status(404).json({
        message: "Sách không tồn tại"
      });
    }

    const checkUnfollow = await db.FollowBookModel.destroy({
      where: { user_id: user, book_id: book.id }
    });

    if (!checkUnfollow) {
      return res.status(404).json({
        message: "Bạn chưa follow sách này"
      });
    }

    return res.json({ message: "Unfollow thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}