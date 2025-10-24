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
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'book',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      volume_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'volume',
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
