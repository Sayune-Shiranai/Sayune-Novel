'use strict';

export async function up(queryInterface, Sequelize) {
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
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('category');
}
