'use strict';

import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  // Tạo hash riêng cho từng user
  const passwordHash = await bcrypt.hash('123456', 10);

  await queryInterface.bulkInsert('users', [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      role_id: 5, // Admin
      img_avatar: null,
      img_background: null,
      createDate: Sequelize.literal('GETDATE()'),
      refreshToken: null
    },
    {
      username: 'leader',
      email: 'leader@example.com',
      password: passwordHash,
      role_id: 3, // Leader
      img_avatar: null,
      img_background: null,
      createDate: Sequelize.literal('GETDATE()'),
      refreshToken: null
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: passwordHash,
      role_id: 1, // User
      img_avatar: null,
      img_background: null,
      createDate: Sequelize.literal('GETDATE()'),
      refreshToken: null
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
