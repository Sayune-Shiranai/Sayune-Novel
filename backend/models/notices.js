import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // kết nối Sequelize

const noticesModel = connectDB.define("noticesModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'library',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chapters',  // tên bảng cha
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  notice_content: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "notices",
  timestamps: false,
});

export default noticesModel;
