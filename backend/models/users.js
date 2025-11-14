import { DataTypes } from "sequelize";
import connectDB from "../db/db.js";
import roleModel from "./role.js";

const usersModel = connectDB.define("usersModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'role',
      key: 'id'
    },
  },
  img_avatar: { 
    type: DataTypes.STRING(255), 
    allowNull: true,
  },
  img_background: { 
    type: DataTypes.STRING(255), 
    allowNull: true, 
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW,
  },
  refreshToken: { 
    type: DataTypes.TEXT, 
    allowNull: true,
  }
}, {
  tableName: "users",
  timestamps: false,
});

usersModel.belongsTo(roleModel, { 
  foreignKey: "role_id", 
  as: "role"
});

roleModel.hasMany(usersModel, {
   foreignKey: "role_id" 
});

export default usersModel;
