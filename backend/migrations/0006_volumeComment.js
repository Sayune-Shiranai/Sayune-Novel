'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('volumecomment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'book',
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },

    volume_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
        model: 'volume',
        key: 'id'
      },
      onUpdate: 'CASCADE'
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

    content: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable('volumecomment');
}


