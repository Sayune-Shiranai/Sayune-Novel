import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // Kết nối đến Sequelize instance
import categoryModel from "./category.js";
import volumeModel from "./volume.js";

const bookModel = connectDB.define("bookModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  book_number: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  another_name: { 
    type: DataTypes.STRING, 
    allowNull: true
  },
  slug: { 
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  img: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  author: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  artist: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  status: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    },
    onUpdate: "CASCADE"
  },
}, {
  tableName: "book",
  timestamps: true,
});

// bookModel.belongsToMany(categoryModel, { 
//   through: "BookCategory",
//   foreignKey: "book_id"
// });

export default bookModel;
