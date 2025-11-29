'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('artist', {
    id: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true, 
      primaryKey: true
    },

    name: { 
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

    createdAt: { 
      type: Sequelize.DATE, 
      allowNull: false, 
      defaultValue: Sequelize.literal('GETDATE()') 
    },

    updatedAt: { 
      type: Sequelize.DATE, 
      allowNull: false, 
      defaultValue: Sequelize.literal('GETDATE()') 
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('artist');
}
