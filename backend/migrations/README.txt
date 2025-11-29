tạo db theo config
npx sequelize-cli db:create

xóa db
npx sequelize-cli db:drop


chạy tất cả table
npx sequelize-cli db:migrate

xóa tất cả table
npx sequelize-cli db:migrate:undo:all

chạy từng table
npx sequelize-cli db:migrate --to (tên file)

xóa từng table

npx sequelize-cli db:migrate:undo --name (tên file)

npx sequelize-cli db:migrate --to 0004_chapters.js --debug

npx sequelize-cli db:seed --seed 0001_roleData.js

npx sequelize-cli db:seed --seed 0002_ModerationStatusData.js

npx sequelize-cli db:seed --seed 0005_categoryData.js

npx sequelize-cli db:seed:undo

chạy tất cả seeders
npx sequelize-cli db:seed:all --debug

xóa tất cả seeders
npx sequelize-cli db:seed:undo:all