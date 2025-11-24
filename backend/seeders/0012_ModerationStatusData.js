"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ModerationStatus", [
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
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ModerationStatus", null, {});
  },
};
