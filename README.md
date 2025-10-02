# Sayune-Novel
Hệ thống quản lý web truyện online


## Công nghệ sử dụng
### Frontend (React)

### Backend (Express)

### 1.Cài đặt môi trường Sequelize CLI
```bash
npm install sequelize sequelize-cli --save-dev
```

### 2.Cấu hình cho Sequelize CLI kết nối sql server
```bash
Tạo file .env
cp .env.example .env
Sau đó mở file .env và chỉnh sửa thông tin phù hợp với môi trường
```

### 3.Chạy Sequelize CLI
```bash
Tạo database
npx sequelize-cli db:create
```bash
Tạo tất cả table
npx sequelize-cli db:migrate
```bash
Tạo tất cả seeders ( Tạo tất cả dữ liệu mẫu nếu cần )
npx sequelize-cli db:seed:all
```

