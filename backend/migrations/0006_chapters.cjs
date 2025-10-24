'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chapters', {
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
        allowNull: false,
          references: {
          model: 'volume',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      title: { 
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      chapter_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chapters');
  }
};


