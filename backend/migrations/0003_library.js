'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tạo bảng library trước, không FK
    await queryInterface.createTable('library', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      itemname: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      slug: { 
        type: Sequelize.STRING, 
        allowNull: true, 
        unique: true 
      },
      theloai_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true,
        references: {
          model: 'category',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      tacgia: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      trangthai: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      noidung: { 
        type: Sequelize.TEXT, 
        allowNull: true 
      },
      user_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true, // nullable để tránh lỗi khi bảng users rỗng
        references: {
          model: 'users',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createDate: { 
        type: Sequelize.DATE, 
        allowNull: true, 
        defaultValue: Sequelize.literal('GETDATE()') 
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('library');
  }
};
