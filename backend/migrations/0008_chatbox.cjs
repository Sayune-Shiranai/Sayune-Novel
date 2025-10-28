'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chatbox', {
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
      chatbox_content: { 
        type: Sequelize.TEXT 
      },
      createDate: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal('GETDATE()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chatbox');
  }
};
