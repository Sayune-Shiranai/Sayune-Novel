tạo db theo config
npx sequelize-cli db:create

chạy tất cả table
npx sequelize-cli db:migrate

xóa tất cả table
npx sequelize-cli db:migrate:undo:all

chạy từng table
npx sequelize-cli db:migrate --to (tên file)

xóa từng table

npx sequelize-cli db:migrate:undo --name (tên file)

npx sequelize-cli db:migrate --to 0004_chapters.js --debug

chạy tất cả seeders
npx sequelize-cli db:seed:all --debug

xóa tất cả seeders
npx sequelize-cli db:seed:undo:all

