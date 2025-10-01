'use strict';

import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const passwordHash = await bcrypt.hash('123456', 10);
  await queryInterface.bulkInsert('users', [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'admin',
      createDate: new Date(),
      refreshToken: null,
    },
    {
      username: 'member',
      email: 'member@example.com',
      password: passwordHash,
      role: 'member',
      createDate: new Date(),
      refreshToken: null,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
