'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('volume', [
    {
      book_id: 1,
      volume_number: 1,
      title: 'Chapter 1: Title test 1',
      user_id: 1,
      chapter_content: 'chapter content test 1 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 1,
      volume_number: 2,
      title: 'Chapter 2: Title test 2',
      user_id: 1,
      chapter_content: 'chapter content test 2 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 2,
      volume_number: 1,
      title: 'Chapter 1: Title test 1',
      user_id: 2,
      chapter_content: 'chapter content test 1 for book 2',
      createDate: Sequelize.literal('GETDATE()'),
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('volume', null, {});
}
