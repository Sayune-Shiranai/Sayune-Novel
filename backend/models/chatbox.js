import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // kết nối Sequelize

const chatboxModel = connectDB.define("chatboxModel", {
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
  chatbox_content: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "chatbox",
  timestamps: false,
});

export default chatboxModel;
