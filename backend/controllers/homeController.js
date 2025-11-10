import bookModel from "../models/book.js";

export async function getAllBook(req, res) {
  try {
    const book = await bookModel.findAll();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
