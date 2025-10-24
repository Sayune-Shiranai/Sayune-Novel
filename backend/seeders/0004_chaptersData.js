'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('chapters', [
    {
      book_id: 1,
      chapter_number: 1,
      chapter_name: 'chapter name 1',
      chapter_content: 'content of chapter 1...',
      user_id: 1,
      createDate: new Date(),
    },
    {
      book_id: 1,
      chapter_number: 2,
      chapter_name: 'chapter name 2',
      chapter_content: 'content of chapter 2...',
      user_id: 1,
      createDate: new Date(),
    },
    {
      book_id: 2,
      chapter_number: 1,
      chapter_name: 'chapter name 1',
      chapter_content: 'content of chapter 1...',
      user_id: 2,
      createDate: new Date(),
    },
    {
      book_id: 3,
      chapter_number: 1,
      chapter_name: 'chapter name 1',
      chapter_content: 'content of chapter 1...',
      user_id: 2,
      createDate: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('chapters', null, {});
}
