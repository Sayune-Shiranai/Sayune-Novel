'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
      category_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true,
        references: {
          model: 'category',
          key: 'id'
        },
        onUpdate: 'CASCADE',
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
        type: Sequelize.STRING, 
        allowNull: true 
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
      dateUpload: { 
        type: Sequelize.DATE, 
        allowNull: true, 
        defaultValue: Sequelize.literal('GETDATE()') 
      },
      dateUpdate: { 
        type: Sequelize.DATE, 
        allowNull: true, 
        defaultValue: Sequelize.literal('GETDATE()') 
      },  
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book');
  }
};
