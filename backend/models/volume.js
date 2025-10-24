import { DataTypes } from "sequelize";
import connectDB from "../db/db.js";

const volumeModel = connectDB.define("volumeModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "book",
      key: "id",
    },
    onUpdate: "CASCADE",
  },
  volume_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
  },
  createDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "volume",
  timestamps: false,
});

export default volumeModel;
