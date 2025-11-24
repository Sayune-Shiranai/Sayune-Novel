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
    },

    trangthai: { 
      type: Sequelize.INTEGER, 
      allowNull: true, 
      references: {
        model: 'ModerationStatus',
        key: 'id'
      },
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('category');
}
