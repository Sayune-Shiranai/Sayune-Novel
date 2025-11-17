import { DataTypes } from "sequelize";
import connectDB from "../db/db.js";
import bookModel from "./book.js";

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

  chapter_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "volume",
  timestamps: true,
});

bookModel.hasMany(volumeModel, {
  foreignKey: "book_id",
  as: "volume",
});

volumeModel.belongsTo(bookModel, {
  foreignKey: "book_id",
});

usersModel.hasMany(volumeModel, {
  foreignKey: "user_id",
  as: "UserVolume",
});

volumeModel.belongsTo(usersModel, {
  foreignKey: "user_id",
});

export default volumeModel;
