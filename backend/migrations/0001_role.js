'use strict';

export async function up (queryInterface, Sequelize) {
  await queryInterface.createTable('role', {
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true 
    },
    role: { 
      type: Sequelize.STRING, 
      allowNull: false,
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('role');
}
