'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('chatbox', [
    {
      user_id: 1,
      chatbox_content: 'chatbox content 1 user 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 2,
      chatbox_content: 'chatbox content 1 user 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 1,
      chatbox_content: 'chatbox content 2 user 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 2,
      chatbox_content: 'chatbox content 2 user 2',
      createDate: Sequelize.literal('GETDATE()'),
    },
    {
      user_id: 1,
      chatbox_content: 'chatbox content 3 user 1',
      createDate: Sequelize.literal('GETDATE()'),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('chatbox', null, {});
}
