'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('role', [
    {
      id: 1,
      role: 'Member'
    },
    {
      id: 2,
      role: 'Uploader' //Thành viên nhóm dịch hoặc người đăng truyện.
    },
    {
      id: 3,
      role: 'Leader' //Quản lý nhóm dịch hoặc biên tập nội dung.
    },
    {
      id: 4,
      role: 'Mod' //Người kiểm duyệt nội dung và quản lý cộng đồng.(Duyệt truyện mới, Xóa comment, khóa người dùng, Cảnh cáo nhóm vi phạm)
    },
    {
      id: 5,
      role: 'Admin'
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('role', null, {});
}
