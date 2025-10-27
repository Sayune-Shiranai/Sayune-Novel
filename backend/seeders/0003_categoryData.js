'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('category', [
    {
      category: 'Hành động'
    },
    {
      category: 'Tình cảm'
    },
    {
      category: 'Phiêu lưu'
    },
    {
      category: 'Kinh dị'
    },
    {
      category: 'Hài hước'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('category', null, {});
}
