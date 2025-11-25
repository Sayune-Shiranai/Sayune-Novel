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
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },

    role_id: {
      type: Sequelize.INTEGER, 
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },

    title: { 
      type: Sequelize.TEXT 
    },

    forum_content: { 
      type: Sequelize.TEXT 
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
  await queryInterface.dropTable('forum');
}
