tạo db theo config
npx sequelize-cli db:create

xóa tất cả table
npx sequelize-cli db:migrate:undo:all

chạy tất cả table
npx sequelize-cli db:migrate

chạy từng table
npx sequelize-cli db:migrate --to (tên file)

npx sequelize-cli db:migrate --to 0001_users.js

npx sequelize-cli db:migrate --to 0002_category.js

npx sequelize-cli db:migrate --to 0003_library.js

npx sequelize-cli db:migrate --to 0004_chapters.js

npx sequelize-cli db:migrate --to 0005_forum.js

npx sequelize-cli db:migrate --to 0006_chatbox.js

npx sequelize-cli db:migrate --to 0007_report.js

npx sequelize-cli db:migrate --to 0008_notices.js

xóa từng table

npx sequelize-cli db:migrate:undo --name (tên file)

npx sequelize-cli db:migrate --to 0004_chapters.js --debug


