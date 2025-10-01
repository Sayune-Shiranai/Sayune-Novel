'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('chatbox', [
    {
      user_id: 1, // admin
      chatbox_content: 'chatbox content 1',
      createDate: new Date(),
    },
    {
      user_id: 2, // member
      chatbox_content: 'chatbox content 2',
      createDate: new Date(),
    },
    {
      user_id: 1, // admin
      chatbox_content: 'chatbox content 3',
      createDate: new Date(),
    },
    {
      user_id: 2, // member
      chatbox_content: 'chatbox content 4',
      createDate: new Date(),
    },
    {
      user_id: 1, // admin
      chatbox_content: 'chatbox content 5',
      createDate: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('chatbox', null, {});
}
