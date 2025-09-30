import express from "express";
import sql from "mssql";
import { Sequelize } from "sequelize";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";


// load biến môi trường
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = 3000;

app.use("/users", userRouter);

// Route test kết nối
app.get("/connectDB", async (req, res) => {
  try {
    await connectDB.authenticate(); // kiểm tra kết nối
    res.json({ success: true, message: "✅ Kết nối thành công với SQL Server!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Kết nối thất bại", error: err.message });
  }
});

// app.get("/users", async (req, res) => {
//   try {
//     const user = await users.findAll();
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
