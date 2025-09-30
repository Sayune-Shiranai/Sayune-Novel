import { DataTypes } from "sequelize";
import connectDB from "../db/db.js"; // ví dụ import kết nối

const reportModel = connectDB.define("reportModel", {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'library',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'chapters',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      reason: { 
        type: Sequelize.TEXT,
        allowNull: false
      },
      createDate: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn('GETDATE') 
      }
}, {
  tableName: "report",
  timestamps: false,
});

export default reportModel;
