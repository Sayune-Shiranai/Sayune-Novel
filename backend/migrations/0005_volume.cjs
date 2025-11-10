'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('volume', {
        id: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        book_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { 
                model: 'book', 
                key: 'id' 
            },
            onUpdate: 'CASCADE',
        },
        volume_number: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        title: { 
            type: Sequelize.STRING, 
            allowNull: true,
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

        chapter_content: {
            type: Sequelize.TEXT,
            allowNull: true,
        
        },
        createDate: { 
            type: Sequelize.DATE, 
            defaultValue: Sequelize.literal('GETDATE()') 
        },
    });
  },
  async down(queryInterface, Sequelize) {
    // Xóa FK trước khi drop table
    await queryInterface.dropTable('volume');
  }
};


