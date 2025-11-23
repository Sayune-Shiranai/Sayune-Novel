'use strict';

export async function up (queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },

    username: { 
      type: Sequelize.STRING, 
      allowNull: false,      
    },

    email: { 
      type: Sequelize.STRING, 
      allowNull: true, 
    },

    password: { 
      type: Sequelize.STRING, 
      allowNull: false,
    },

    role_id: { 
      type: Sequelize.INTEGER, 
      allowNull: false, 
      references: {
        model: 'role',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },

    img_avatar: { 
      type: Sequelize.STRING, 
      allowNull: true 
    },

    img_background: { 
      type: Sequelize.STRING, 
      allowNull: true,
    },

    trangthai: { 
      type: Sequelize.INTEGER, 
      allowNull: true, 
    },

    refreshToken: { 
      type: Sequelize.STRING, 
      allowNull: true,
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
  await queryInterface.dropTable('users');
}
