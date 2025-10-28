'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('chapters', [
    {
      book_id: 1,
      volume_id: 1,
      chapter_content: 'Chapter 1 chapter content test 1 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 1,
      volume_id: 2,
      chapter_content: 'Chapter 2 chapter content test 2 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 2,
      volume_id: 1,
      chapter_content: 'Chapter 1 chapter content test 1 for book 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 2,
      volume_id: 2,
      chapter_content: 'Chapter 2 chapter content test 2 for book 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 3,
      volume_id: 1,
      chapter_content: 'Chapter 1 chapter content test 1 for book 3',
      createDate: Sequelize.literal('GETDATE()'),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('chapters', null, {});
}
