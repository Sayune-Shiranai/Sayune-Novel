'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('BookCategory', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { 
        model: 'category', 
        key: 'id' },
      onUpdate: 'CASCADE'
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('BookCategory');
}
