import { DataTypes } from "sequelize";
import sequelize from "../backend/config/config.js"; // ví dụ import kết nối

const user = sequelize.define("User", {
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
    defaultValue: "member",
  },
}, {
  tableName: "users",
  timestamps: false,
});

export default user;
