'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('ModerationStatus', [
      {
        id: 0,
        name: "Pending",
        description: "Chờ duyệt",
      },
      {
        id: 1,
        name: "Approved",
        description: "Đã duyệt",
      },
      {
        id: 2,
        name: "Rejected",
        description: "Hủy duyệt",
      },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('ModerationStatus', null, {});
}
