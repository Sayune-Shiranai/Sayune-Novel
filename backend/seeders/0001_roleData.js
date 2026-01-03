'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('role', [
    {
      role: 'Member'
    },
    {
      role: 'Uploader' //Thành viên nhóm dịch hoặc người đăng truyện.
    },
    {
      role: 'Mod' //Người kiểm duyệt nội dung và quản lý cộng đồng.(Duyệt truyện mới, Xóa comment, khóa người dùng, Cảnh cáo nhóm vi phạm)
    },
    {
      role: 'Admin'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('role', null, {});
}
