'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ModerationStatus', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ModerationStatus');
}
