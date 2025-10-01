'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('chapters', [
    {
      item_id: 1,   // FK tới library.id (One Piece)
      chapter_number: 1,
      chapter_name: 'chapter name 1',
      chapter_content: 'content of chapter 1...',
      user_id: 1,   // admin
      createDate: new Date(),
    },
    {
      item_id: 1,
      chapter_number: 2,
      chapter_name: 'chapter name 2',
      chapter_content: 'content of chapter 2...',
      user_id: 1,
      createDate: new Date(),
    },
    {
      item_id: 2,   // FK tới library.id (Naruto)
      chapter_number: 1,
      chapter_name: 'chapter name 1',
      chapter_content: 'content of chapter 1...',
      user_id: 2,   // member
      createDate: new Date(),
    },
    {
      item_id: 3,   // FK tới library.id (Your Name)
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
