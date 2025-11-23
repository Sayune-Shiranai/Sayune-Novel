import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { DataTypes, Sequelize } from 'sequelize';
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
  try {
    const modelUrl = await import(fileUrl);

    if (!modelUrl.default) {
      console.error(`File "${file}" không export default.`);
      continue;
    }

    const model = modelUrl.default(connectDB, DataTypes);

    if (!model || !model.name) {
      console.error(`Model trong file "${file}" không có name.`);
      continue;
    }

    db[model.name] = model;
    console.log(`Loaded model "${model.name}" from "${file}"`);

  } catch (err) {
    console.error(`Không thể load model từ file "${file}":`, err.message);
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  } else {
    console.log(`Model "${modelName}" không có associate.`);
  }
});


db.sequelize = connectDB;
db.Sequelize = Sequelize;


export default db;
