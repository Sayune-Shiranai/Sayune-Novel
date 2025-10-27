'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu mẫu vào bảng volume
    await queryInterface.bulkInsert('volume', [
      {
        book_id: 1,
        volume_number: 1,
        title: 'Chapter 1: Title test 1',
        user_id: 1,
        createDate: new Date()
      },
      {
        book_id: 1,
        volume_number: 2,
        title: 'Chapter 2: Title test 2',
        user_id: 1,
        createDate: new Date()
      },
      {
        book_id: 2,
        volume_number: 1,
        title: 'Chapter 1: Title test 1',
        user_id: 2,
        createDate: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('volume', null, {});
  }
};
