'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('book', {
    id: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },

    book_number: { 
      type: Sequelize.INTEGER, 
      allowNull: false, 
    },

    title: { 
      type: Sequelize.STRING, 
      allowNull: false,
    },
    another_name: { 
      type: Sequelize.STRING, 
      allowNull: true,
    },

    slug: { 
      type: Sequelize.STRING, 
      allowNull: true, 
      unique: true 
    },

    img: {
      type: Sequelize.STRING, 
      allowNull: true,
    },

    author: { 
      type: Sequelize.STRING, 
      allowNull: true 
    },

    artist: { 
      type: Sequelize.STRING, 
      allowNull: true 
    },

    status: { 
      type: Sequelize.INTEGER, 
      allowNull: true,
      references: {
        model: 'Status',
        key: 'id'
      },
    },

    description: { 
      type: Sequelize.TEXT, 
      allowNull: true 
    },

    user_id: { 
      type: Sequelize.INTEGER, 
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE'
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
  await queryInterface.dropTable('book');
}