'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('BookCategory', [
    { 
        book_id: 1, 
        category_id: 1 
    },

    { 
        book_id: 1, 
        category_id: 2 
    },

    { 
        book_id: 2, 
        category_id: 2 
    },
    { 
        book_id: 2, 
        category_id: 3 
    },

    { 
        book_id: 3, 
        category_id: 1 
    },
    { 
        book_id: 3, 
        category_id: 3 
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('BookCategory', null, {});
}
