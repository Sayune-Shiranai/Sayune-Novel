'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('book', [
    {
      itemname: 'Item Test 1',
      slug: 'item-test-1',
      theloai_id: 1,
      tacgia: 'tac gia 1',
      trangthai: 'Đang tiến hành',
      noidung: 'noi dung item test 1',
      user_id: 1,
      createDate: new Date()
    },
    {
      itemname: 'Item Test 2',
      slug: 'item-test-2',
      theloai_id: 1,
      tacgia: 'tac gia 2',
      trangthai: 'Hoàn thành',
      noidung: 'noi dung item test 2',
      user_id: 1,
      createDate: new Date()
    },
    {
      itemname: 'Item Test 3',
      slug: 'item-test-3',
      theloai_id: 2,
      tacgia: 'tac gia 3',
      trangthai: 'Hoàn thành',
      noidung: 'noi dung item test 3',
      user_id: 2,
      createDate: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('book', null, {});
}
