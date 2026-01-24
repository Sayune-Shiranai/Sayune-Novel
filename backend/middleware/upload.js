import multer from "multer";
import path from "path";
import fs from "fs";

function getUploadPath(req) {
  const slug = req.params.slug;
  const volume = req.body.volume_number;
  console.log("volume:", volume)

  // --- Upload Volume ---
  if (slug && volume) {
    return `/media/truyen/${slug}/volume-${volume}`;
  }

  // --- Upload Book ---
  if (!slug) {
    return `media/books_images`;
  } else {
    return `media/books_images`;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(process.cwd(), "media/books_images"));
    const folder = getUploadPath(req, file);
    console.log("Upload folder:", folder);
    if (!folder) return cb(new Error("Thiếu đường dẫn upload file!"), null);

    const finalPath = path.join(process.cwd(), folder);
    fs.mkdirSync(finalPath, { recursive: true });

    cb(null, finalPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
