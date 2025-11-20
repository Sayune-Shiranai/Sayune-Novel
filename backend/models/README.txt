Quan Hệ Sequelize (ORM level)
1. belongsTo (N → 1)

Dùng khi model hiện tại chứa khóa ngoại trỏ đến model khác.

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });


Bảng users có cột role_id

Một user thuộc về một role

Sequelize tạo JOIN từ User.role_id → Role.id

2. hasOne (1 → 1)

Model A có 1 bản ghi liên kết với model B.

User.hasOne(Profile, { foreignKey: "user_id" });


Dùng khi model B chứa khóa ngoại trỏ đến model A.

3. hasMany (1 → N)

Một bản ghi A có nhiều bản ghi B.

User.hasMany(Post, { foreignKey: "user_id" });


Dùng khi model B chứa khóa ngoại.

→ Một User có nhiều Post.

4. belongsToMany (N ↔ N)

Quan hệ nhiều – nhiều, cần một bảng trung gian.

Book.belongsToMany(Category, { through: "BookCategory" });
Category.belongsToMany(Book, { through: "BookCategory" });

npx sequelize-cli model:generate --name Student --attributes name:string