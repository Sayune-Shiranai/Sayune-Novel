'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('report', [
      {
        user_id: 1,
        book_id: 1,
        volume_id: 1,
        reason: 'Lỗi chính tả trong chương 1.',
        createDate: new Date()
      },
      {
        user_id: 1,
        book_id: 2,
        volume_id: 1,
        reason: 'Hình ảnh trong chương bị lỗi hiển thị.',
        createDate: new Date()
      },
      {
        user_id: 1,
        book_id: 3,
        volume_id: 1,
        reason: 'Truyện có nội dung không phù hợp.',
        createDate: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('report', null, {});
  }
};
