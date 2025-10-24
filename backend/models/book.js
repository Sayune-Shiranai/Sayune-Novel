import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // Kết nối đến Sequelize instance

const bookModel = connectDB.define("bookModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  book_number: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  another_name: { 
    type: DataTypes.STRING, 
    allowNull: true
  },
  slug: { 
    type: DataTypes.STRING, 
    allowNull: true, 
    unique: true 
  },
  img: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  category_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: "category", // Tên bảng cha
      key: "id"
    },
    onUpdate: "CASCADE"
  },
  author: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  artist: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  status: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    },
    onUpdate: "CASCADE"
  },
  dateUpload: { 
    type: DataTypes.DATE, 
    allowNull: true, 
    defaultValue: DataTypes.NOW
  },
  dateUpdate: { 
    type: DataTypes.DATE, 
    allowNull: true, 
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "book",
  timestamps: false,
});

export default bookModel;
