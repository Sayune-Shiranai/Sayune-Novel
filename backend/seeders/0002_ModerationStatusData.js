'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('ModerationStatus', [
      {
        name: "Pending",
        description: "Chờ duyệt",
      },
      {
        name: "Approved",
        description: "Đã duyệt",
      },
      {
        name: "Rejected",
        description: "Hủy duyệt",
      },
    ]);
  }

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('ModerationStatus', null, {});
}
