'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Status', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Status');
}
