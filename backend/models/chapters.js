import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const chaptersModel = connectDB.define("chaptersModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "library",  // tên bảng cha
      key: "id",
    },
    onUpdate: "CASCADE",
  },
  chapter_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chapter_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  chapter_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",  // tên bảng cha
      key: "id",
    },
    onUpdate: "CASCADE",
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Sequelize sẽ dùng thời gian hiện tại
  },
}, {
  tableName: "chapters",
  timestamps: false,
});

export default chaptersModel;
