'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('notices', [
    {
      user_id: 1,
      book_id: 1,
      volume_id: 1,
      notice_content: 'Notice content 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 1,
      book_id: 2,
      volume_id: 1,
      notice_content: 'Notice content 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 1,
      book_id: 3,
      volume_id: 1,
      notice_content: 'Notice content 3',
      createDate: Sequelize.literal('GETDATE()'),
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('notices', null, {});
}
