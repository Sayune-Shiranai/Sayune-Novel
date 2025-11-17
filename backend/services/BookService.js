import { book, category } from "../models/BookCategory.js";

class BookService {

  async getAllBooks() {
    return await book.findAll({
      include: {
        model: category,
        through: { attributes: [] }
      }
    });
  }

  async getBookBySlug(slug) {
    return await book.findOne({
      where: { slug },
      include: category
    });
  }

  async createBook(data) {
    const { title, slug, description, categoryIds } = data;

    const newBook = await book.create({ title, slug, description });

    if (categoryIds) {
      await newBook.setCategories(categoryIds);
    }

    return newBook;
  }

  async updateBook(id, data) {
    const current = await book.findByPk(id);
    if (!current) return null;

    const { title, slug, description, categoryIds } = data;

    await current.update({ title, slug, description });

    if (categoryIds) {
      await current.setCategories(categoryIds);
    }

    return current;
  }

  async deleteBook(id) {
    const current = await book.findByPk(id);
    if (!current) return null;

    await current.destroy();
    return true;
  }
}

export default new BookService();
