import db from "../models/index.js";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export async function GetPaged(req, res) {
  try {
    const book_slug = req.params.slug;
    console.log("book_slug:", book_slug);
    let { page = 1, limit = 10, keyword = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let where = {};

    if (keyword.trim() !== "") {
      where = {
        [Op.or]: [
          { volume_number: { [Op.like]: `%${keyword}%` } },
          { title: { [Op.like]: `%${keyword}%` } },
        ]
      };
    }

    const totalRecords = await db.volumeModel.count({ where });

    const volume = await db.volumeModel.findAll({
      where,
      include: [{ 
        model: db.bookModel,
        as: "Volume_Book"
      }],
      limit,
      offset,
      order: [["id", "DESC"]],
    });


    const totalPages = Math.ceil(totalRecords / limit);

    return res.json({
      page,
      limit,
      totalPages,
      totalRecords,
      data: volume,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


// create volume
export async function createVolume(req, res) {
  try {
    const book_slug = req.params.slug;
    console.log("book_slug:", book_slug);

    if (!book_slug) {
      return res.status(400).json({ error: "Vui lòng nhập slug book!" });
    }

    const book = await db.bookModel.findOne({ where: { slug: book_slug } });

    if (!book) {
      return res.status(404).json({ error: "Book không tồn tại!" });
    }
    let {
      volume_number,
      title,
      user_id // fix tự động update theo tk up book
    } = req.body;



    // if (!book_id) {
    //   return res.status(400).json({ error: "Vui lòng nhập book!" });
    // }

    // const book = await db.bookModel.findOne({
    //   where: { id: book_id }
    // });

    const slug = book.slug;

    if (!volume_number || isNaN(volume_number)) {
      return res.status(400).json({ error: "Vui lòng nhập số volume!" });
    }

    const CheckVolumeNumber = await db.volumeModel.findOne({
      where: { 
        book_id: book.id,
        volume_number 
      }
    });

    if (CheckVolumeNumber) {
      return res.status(400).json({
        error: `Volume number '${volume_number}' đã tồn tại!`
      });
    }

    const files = await req.saveRequestFiles();

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Vui lòng upload ít nhất 1 ảnh!" });
    }

    const folderPath = `./media/truyen/${slug}/volume-${volume_number}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    let imgPaths = [];

    for (const file of files) {
      const fileName = file.filename;
      const filePath = path.join(folderPath, fileName);

      await pipeline(file.file, fs.createWriteStream(filePath));

      imgPaths.push(`/media/truyen/${slug}/volume-${volume_number}/${fileName}`);
    }

    const newVolume = await db.volumeModel.create({
      book_id: book.id,
      volume_number,
      title,
      user_id,
      chapter_content: JSON.stringify(imgPaths)
    });

    return res.json({
      message: "Tạo volume thành công!",
      data: newVolume
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// delete volume
export async function deleteVolume(req, res) {
  try {
    const { id } = req.params;

    const volume = await db.volumeModel.findOne({
      where: { id }
    });
    if (!volume) return res.status(404).json({ error: "Không tìm thấy volume!" });

    await volume.destroy();

    res.json({ message: "Xóa volume thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function approveVolume(req, res) {
  try {
    const { id } = req.params;
    const volume = await db.volumeModel.findOne({
      where: { id }
    });
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy volume!' });

    volume.trangthai = 1;
    await volume.save();

    res.json({ success: true, message: 'Đã duyệt', data: volume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function rejectVolume(req, res) {
  try {
    const { id } = req.params;
    const volume = await db.volumeModel.findOne({
      where: { id }
    });
    if (!volume) return res.status(404).json({ success: false, message: 'Không tìm thấy volume!' });

    volume.trangthai = 2;
    await volume.save();

    res.json({ success: true, message: 'Hủy duyệt', data: volume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
