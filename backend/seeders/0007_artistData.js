'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('artist', [
    {
      name: 'Artist test 1'
    },
    {
      name: 'Artist test 2'
    },
    {
      name: 'Artist test 3'
    },
    {
      name: 'Artist test 4'
    },
    {
      name: 'Artist test 5'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('artist', null, {});
}
