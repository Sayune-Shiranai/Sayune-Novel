// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // Thêm 2 record vào library
//     await queryInterface.bulkInsert('library', [
//       { id: 100, itemname: 'Truyện A', theloai_id: 1, user_id: 1, createDate: new Date() },
//       { id: 200, itemname: 'Truyện B', theloai_id: 2, user_id: 1, createDate: new Date() }
//     ]);

//     // Thêm chapter tham chiếu library.id
//     await queryInterface.bulkInsert('chapters', [
//       { item_id: 100, chapter_number: 1, chapter_name: 'Chương 1', user_id: 1, createDate: new Date() },
//       { item_id: 100, chapter_number: 2, chapter_name: 'Chương 2', user_id: 1, createDate: new Date() },
//       { item_id: 200, chapter_number: 1, chapter_name: 'Chương 1', user_id: 1, createDate: new Date() }
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('chapters', null, {});
//     await queryInterface.bulkDelete('library', null, {});
//   }
// };
