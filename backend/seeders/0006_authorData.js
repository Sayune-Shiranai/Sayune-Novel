'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('author', [
    {
      name: 'Author test 1'
    },
    {
      name: 'Author test 2'
    },
    {
      name: 'Author test 3'
    },
    {
      name: 'Author test 4'
    },
    {
      name: 'Author test 5'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('author', null, {});
}
