'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notices', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // tên bảng cha
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      volume_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'volume',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      notice_content: { 
        type: Sequelize.TEXT,
        allowNull: true
      },
      createDate: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn('GETDATE') 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notices');
  }
};
