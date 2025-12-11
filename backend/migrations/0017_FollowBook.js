'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('FollowBook', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
         model: 'book', 
         key: 'id' 
        },
      onUpdate: 'CASCADE',
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { 
        model: 'users', 
        key: 'id' 
    },
      onUpdate: 'CASCADE'
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('FollowBook');
}
