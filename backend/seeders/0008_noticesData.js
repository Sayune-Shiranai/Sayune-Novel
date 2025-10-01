'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('notices', [
    {
      user_id: 1,        // admin tạo thông báo
      item_id: 1,        // liên quan truyện id=1
      chapter_id: 1,  // thông báo toàn truyện
      notice_content: 'notice 1',
      createDate: new Date(),
    },
    {
      user_id: 2,        
      item_id: 1,        
      chapter_id: 1,     // thông báo riêng cho chương 1
      notice_content: 'notice 2',
      createDate: new Date(),
    },
    {
      user_id: 1,        
      item_id: 2,     // thông báo chung cho toàn hệ thống
      chapter_id: 1,
      notice_content: 'notice 3',
      createDate: new Date(),
    },
    {
      user_id: 2,
      item_id: 2,        
      chapter_id: 2,
      notice_content: 'notice 4',
      createDate: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('notices', null, {});
}
