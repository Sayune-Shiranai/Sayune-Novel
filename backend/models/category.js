import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const categoryModel = connectDB.define("categoryModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true
    },
    theloai: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    }
}, {
  tableName: "category",
  timestamps: false,
});

export default categoryModel;
