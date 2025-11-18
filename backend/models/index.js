import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import connectDB from '../db/db.js'; // instance Sequelize

const db = {};

// Lấy tất cả file model trong folder models trừ index.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ModelsFile = path.join(__dirname);  //backend/models
const files = fs.readdirSync(ModelsFile)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== path.basename(__filename) && 
    file.slice(-3) === '.js'
  );

for (const file of files) {
  const fileUrl = pathToFileURL(path.join(ModelsFile, file)).href;
  const model = await import(fileUrl);
  const modelName =  model.default;
  db[modelName.name] = modelName;
}

// Nếu có quan hệ many-to-many hoặc associations
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = connectDB;
db.Sequelize = Sequelize;

export default db;
