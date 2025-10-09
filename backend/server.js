import express from "express";
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
import authRoutes from "./routes/authRoutes.js";


// load biến môi trường
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/library", libraryRoutes);
app.use("/category", categoryRoutes);
app.use("/chapters", chaptersRoutes);
app.use("/chatbox", chatboxRoutes);
app.use("/forum", forumRoutes);
app.use("/notices", noticesRoutes);
app.use("/report", reportRoutes);
app.use("/", authRoutes);


// Route test kết nối
app.get("/connectDB", async (req, res) => {
  try {
    await connectDB.authenticate(); // kiểm tra kết nối
    res.json({ success: true, message: "Kết nối thành công với SQL Server!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Kết nối thất bại", error: err.message });
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
