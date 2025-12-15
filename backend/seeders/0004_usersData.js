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
      role_id: 4, // Admin
      img_avatar: null,
      img_background: null,
      refreshToken: null
    },
    {
      username: 'Upload',
      email: 'Upload@example.com',
      password: passwordHash,
      role_id: 2, // Upload
      img_avatar: null,
      img_background: null,
      refreshToken: null
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: passwordHash,
      role_id: 1, // User
      img_avatar: null,
      img_background: null,
      refreshToken: null
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
