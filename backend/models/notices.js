import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // kết nối Sequelize

const noticesModel = connectDB.define("noticesModel", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'book',
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  volume_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'volume',
      key: 'id'
    },
    onUpdate: 'CASCADE',
  },
  notice_content: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  createDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "notices",
  timestamps: false,
});

export default noticesModel;
