import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // kết nối Sequelize

const forumModel = connectDB.define("forumModel", {
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
  title: { 
    type: DataTypes.TEXT,
    allowNull: false
  },
  forum_content: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "forum",
  timestamps: false,
});

export default forumModel;
