'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('book', [
      {
        book_number: 1,
        title: 'Item Test 1',
        another_name: 'Item 1',
        slug: 'item-test-1',
        img: 'null',
        category_id: 1,
        author: 'Author Test 1',
        artist: 'Artist Test 1',
        status: 'Đang tiến hành',
        description: 'Sescription test 1',
        user_id: 1,
        dateUpload: Sequelize.literal('GETDATE()'),
        dateUpdate: Sequelize.literal('GETDATE()'),
      },
      {
        book_number: 2,
        title: 'Item Test 2',
        another_name: 'Item 2',
        slug: 'item-test-2',
        img: 'null',
        category_id: 1,
        author: 'Author Test 2',
        artist: 'Artist Test 2',
        status: 'Đang tiến hành',
        description: 'Sescription test 2',
        user_id: 1,
        dateUpload: Sequelize.literal('GETDATE()'),
        dateUpdate: Sequelize.literal('GETDATE()'),
      },
      {
        book_number: 3,
        title: 'Item Test 3',
        another_name: 'Item 3',
        slug: 'item-test-3',
        img: 'null',
        category_id: 3,
        author: 'Author Test 3',
        artist: 'Artist Test 3',
        status: 'Đang tiến hành',
        description: 'Sescription test 3',
        user_id: 1,
        dateUpload: Sequelize.literal('GETDATE()'),
        dateUpdate: Sequelize.literal('GETDATE()'),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('book', null, {});
  }
};
