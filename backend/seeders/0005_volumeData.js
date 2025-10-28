'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('volume', [
    {
      book_id: 1,
      volume_number: 1,
      title: 'Chapter 1: Title test 1',
      user_id: 1,
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 1,
      volume_number: 2,
      title: 'Chapter 2: Title test 2',
      user_id: 1,
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      book_id: 2,
      volume_number: 1,
      title: 'Chapter 1: Title test 1',
      user_id: 2,
      createDate: Sequelize.literal('GETDATE()'),
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('volume', null, {});
}
