'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
      },
      category: { 
        type: Sequelize.STRING, 
        allowNull: false 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category');
  }
};
