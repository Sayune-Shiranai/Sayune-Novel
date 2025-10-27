'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Mã hóa mật khẩu trước khi lưu
    const passwordHash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash,
        role: 5, // Giả sử 1 là Admin
        img_avatar: null,
        img_background: null,
        createDate: new Date(),
        refreshToken: null
      },
      {
        username: 'leader',
        email: 'leader@example.com',
        password: passwordHash,
        role: 3, // Giả sử 2 là leader
        img_avatar: null,
        img_background: null,
        createDate: new Date(),
        refreshToken: null
      },
      {
        username: 'user',
        email: 'user@example.com',
        password: passwordHash,
        role: 1, // Giả sử 3 là User
        img_avatar: null,
        img_background: null,
        createDate: new Date(),
        refreshToken: null
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
