'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('volumecomment', [
    {
      book_id: 1,
      volume_id: 1,
      user_id: 1,
      content: 'content test 1 chapter 1 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 1,
      volume_id: 2,
      user_id: 2,
      content: 'content test 1 chapter 2 for book 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 2,
      volume_id: 1,
      user_id: 3,
      content: 'content test 1 chapter 1 for book 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('volumeComment', null, {});
}
