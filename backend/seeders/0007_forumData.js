'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('forum', [
    {
      user_id: 1,
      title: 'forum 1',
      forum_content: 'forum content 1',
      createDate: new Date(),
    },
    {
      user_id: 2,
      title: 'forum 2',
      forum_content: 'forum content 2',
      createDate: new Date(),
    },
    {
      user_id: 2,
      title: 'forum 3',
      forum_content: 'forum content 3',
      createDate: new Date(),
    },
    {
      user_id: 1,
      title: 'forum 4',
      forum_content: 'forum content 4',
      createDate: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('forum', null, {});
}
