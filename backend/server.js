const express = require('express');
const sql = require('mssql');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
const PORT = 3000;

// Cấu hình kết nối SQL Server
const config = {
    user: process.env.DB_USER,              // username SQL Server
    password: process.env.DB_PASSWORD,  // password SA
    server: process.env.DB_SERVER,     // hoặc tên host Docker
    database: process.env.DB_DATABASE,    // tên database bạn muốn kết nối
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',     // nếu không dùng SSL
        trustServerCertificate: true
    }
};


// Route test kết nối
app.get('/test-sql', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT TOP 5 * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi kết nối SQL Server');
    }
});

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
