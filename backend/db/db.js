import { Sequelize } from "sequelize";
import configDB from "../config/config.cjs";

const connectDB = new Sequelize(
  configDB.development.database,
  configDB.development.username,
  configDB.development.password,
  {
    host: configDB.development.host,
    dialect: "mssql",
    dialectOptions: configDB.development.dialectOptions,
    logging: false,
  }
);

export default connectDB;
