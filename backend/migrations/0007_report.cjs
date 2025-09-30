'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('report');
  }
};
