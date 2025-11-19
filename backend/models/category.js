import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối
import bookModel from "./book.js";

const categoryModel = connectDB.define("categoryModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true
    },
    category: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    }
}, {
  tableName: "category",
  timestamps: false,
});

categoryModel.belongsToMany(bookModel, {
   through: "BookCategory",
   foreignKey: "category_id"
  });


export default categoryModel;
