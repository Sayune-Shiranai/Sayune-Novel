// test-connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('SayuneNovel', 'sa', 'Sayune1404', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công!');
  } catch (error) {
    console.error('❌ Kết nối thất bại:', error.message);
  } finally {
    await sequelize.close();
  }
})();
