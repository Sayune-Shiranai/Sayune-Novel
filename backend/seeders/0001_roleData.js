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
      role: 'Leader' //Quản lý nhóm dịch hoặc biên tập nội dung.
    },
    {
      role: 'Moderator' //Người kiểm duyệt nội dung và quản lý cộng đồng.(Duyệt truyện mới, Xóa comment, khóa người dùng, Cảnh cáo nhóm vi phạm)
    },
    {
      role: 'Admin'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('category', null, {});
}
