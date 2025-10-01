'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('report', [
    {
      user_id: 2,     // member báo cáo
      item_id: 1,     // báo cáo truyện id=1
      chapter_id: 1,  // báo cáo chương id=1
      reason: 'reason 1',
      createDate: new Date(),
    },
    {
      user_id: 2,     
      item_id: 2,     
      chapter_id: null, // báo cáo cho toàn truyện
      reason: 'reason 2',
      createDate: new Date(),
    },
    {
      user_id: 1,     // admin báo cáo
      item_id: 1,
      chapter_id: 2,
      reason: 'reason 3',
      createDate: new Date(),
    },
    {
      user_id: 2,
      item_id: null,   // báo cáo chung
      chapter_id: null,
      reason: 'reason 4',
      createDate: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('report', null, {});
}
