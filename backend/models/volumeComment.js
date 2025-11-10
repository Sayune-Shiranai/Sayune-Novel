import { DataTypes } from "sequelize";
import connectDB from "../db/db.js";

const chaptersModel = connectDB.define("chaptersModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "book",
      key: "id",
    },
    onUpdate: "CASCADE",
  },
  volume_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "volume",
      key: "id",
    },
    onUpdate: "CASCADE",
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

  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  createDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "chapters",
  timestamps: false,
});

export default chaptersModel;
