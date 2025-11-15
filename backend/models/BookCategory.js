import { DataTypes } from "sequelize";
import connectDB from "../db/db.js";
import bookModel from "./book.js";
import categoryModel from "./category.js";

const bookCategoryModel = connectDB.define("BookCategory", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true
  },

  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: bookModel,
      key: "id"
    },
    onUpdate: "CASCADE"
  },
  
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: categoryModel,
      key: "id"
    },
    onUpdate: "CASCADE"
  }
}, {
  tableName: "BookCategory",
  timestamps: false
});

export default bookCategoryModel;
