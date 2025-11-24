"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Status", [
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
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
