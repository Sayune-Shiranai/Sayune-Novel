'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('library', [
    {
      itemname: 'Item Test 1',
      slug: 'item-test-1',
      theloai_id: 1,   // FK tới category.id (ví dụ: Hành động)
      tacgia: 'tac gia 1',
      trangthai: 'Đang tiến hành',
      noidung: 'noi dung item test 1',
      user_id: 1,      // FK tới users.id (ví dụ: admin)
      createDate: new Date()
    },
    {
      itemname: 'Item Test 2',
      slug: 'item-test-2',
      theloai_id: 1,   // FK tới category.id (Hành động)
      tacgia: 'tac gia 2',
      trangthai: 'Hoàn thành',
      noidung: 'noi dung item test 2',
      user_id: 1,      // admin tạo
      createDate: new Date()
    },
    {
      itemname: 'Item Test 3',
      slug: 'item-test-3',
      theloai_id: 2,   // FK tới category.id (Tình cảm)
      tacgia: 'tac gia 3',
      trangthai: 'Hoàn thành',
      noidung: 'noi dung item test 3',
      user_id: 2,      // member tạo
      createDate: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('library', null, {});
}
