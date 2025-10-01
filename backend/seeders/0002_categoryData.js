'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('category', [
    {
      theloai: 'Hành động'
    },
    {
      theloai: 'Tình cảm'
    },
    {
      theloai: 'Phiêu lưu'
    },
    {
      theloai: 'Kinh dị'
    },
    {
      theloai: 'Hài hước'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('category', null, {});
}
