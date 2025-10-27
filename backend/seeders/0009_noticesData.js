'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notices', [
      {
        user_id: 1,
        book_id: 1,
        volume_id: 1,
        notice_content: 'Notice content 1',
        createDate: new Date()
      },
      {
        user_id: 1,
        book_id: 2,
        volume_id: 1,
        notice_content: 'Notice content 2',
        createDate: new Date()
      },
      {
        user_id: 1,
        book_id: 3,
        volume_id: 1,
        notice_content: 'Notice content 3',
        createDate: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notices', null, {});
  }
};
