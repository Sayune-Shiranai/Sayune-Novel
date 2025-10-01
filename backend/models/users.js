import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const usersModel = connectDB.define("usersModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW  
  },
  refreshToken: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  }
}, {
  tableName: "users",
  timestamps: false,
});

export default usersModel;
