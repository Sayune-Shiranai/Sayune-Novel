import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const roleModel = connectDB.define("roleModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true
    },
    role: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    }
}, {
  tableName: "role",
  timestamps: false,
});

export default roleModel;
