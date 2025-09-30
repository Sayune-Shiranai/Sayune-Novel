import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // kết nối Sequelize

const libraryModel = connectDB.define("libraryModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  itemname: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  slug: { 
    type: DataTypes.TEXT, 
    allowNull: true, 
    unique: true 
  },
  theloai_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: 'category',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  tacgia: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
  },
  trangthai: { 
    type: DataTypes.STRING(50), 
    allowNull: true 
  },
  noidung: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true, // nullable để tránh lỗi khi bảng users rỗng
    references: {
      model: 'users',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE'
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: true, 
    defaultValue: DataTypes.NOW  // dùng DataTypes.NOW thay vì Sequelize.literal('GETDATE()')
  }
}, {
  tableName: "library",
  timestamps: false,
});

export default libraryModel;
