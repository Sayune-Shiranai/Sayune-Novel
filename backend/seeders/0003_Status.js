"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Status', [
      {
        name: "Đang tiến hành",
      },
      {
        name: "Tạm ngưng",
      },
      {
        name: "Đã hoàn thành",
      },
  ]);
}  

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('ModerationStatus', null, {});
}
