'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tạo bảng trước, không FK
    await queryInterface.createTable('chapters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // nullable để tránh lỗi
        // name: 'FK_chapters_library',
        // foreignKey: true,
        // unique:false,
        references: {
          model: 'library',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      chapter_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chapter_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      chapter_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER, 
        allowNull: true, // nullable để tránh lỗi
        // name: 'FK_chapters_users',
        // foreignKey: true,
        // unique:false,
        references: {
          model: 'users',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE'), // SQL Server
      },
    });


    // await queryInterface.addConstraint('chapters', {
    //   fields: ['item_id'],
    //   type: 'foreign key',
    //   name: 'FK_chapters_library',
    //   references: {
    //     table: 'library',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // // Thêm FK cho user_id
    // await queryInterface.addConstraint('chapters', {
    //   fields: ['user_id'],
    //   type: 'foreign key',
    //   name: 'FK_chapters_users',
    //   references: {
    //     table: 'users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('chapters', 'FK_chapters_library');
    // await queryInterface.removeConstraint('chapters', 'FK_chapters_users');
    // Xóa FK trước khi drop table
    await queryInterface.dropTable('chapters');
  }
};


