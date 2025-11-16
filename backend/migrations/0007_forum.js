'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('forum', {
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
    title: { 
      type: Sequelize.TEXT 
    },
    forum_content: { 
      type: Sequelize.TEXT 
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
  await queryInterface.dropTable('forum');
}
