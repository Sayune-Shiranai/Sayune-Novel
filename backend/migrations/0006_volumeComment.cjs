'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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

      createDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()')
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('volumecomment');
  }
};


