import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const reportModel = connectDB.define("reportModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'book',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  volume_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'volume',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  reason: { 
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  tableName: "report",
  timestamps: true,
});

export default reportModel;
