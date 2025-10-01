import express from "express";
import sql from "mssql";
import { Sequelize } from "sequelize";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import chaptersRoutes from "./routes/chaptersRoutes.js";
import chatboxRoutes from "./routes/chatboxRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import noticesRoutes from "./routes/noticesRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";


// load biến môi trường
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = 3000;

app.use("/users", usersRoutes);
app.use("/library", libraryRoutes);
app.use("/category", categoryRoutes);
app.use("/chapters", chaptersRoutes);
app.use("/chatbox", chatboxRoutes);
app.use("/forum", forumRoutes);
app.use("/notices", noticesRoutes);
app.use("/report", reportRoutes);


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
