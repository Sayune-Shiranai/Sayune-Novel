// sửa file này phải ib
import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import db from "./models/index.js";


//dashboard routes
import UserRoutes from "./routes/dashboard/UsersRoutes.js";
import CategoryRoutes from "./routes/dashboard/CategoryRoutes.js";
import BookRoutes from "./routes/dashboard/BookRoutes.js";
import VolumeRoutes from "./routes/dashboard/VolumeRoutes.js";
import VolumeCommentRoutes from "./routes/dashboard/VolumeCommentRoutes.js";
import ChatboxRoutes from "./routes/dashboard/ChatboxRoutes.js";
import ForumRoutes from "./routes/dashboard/ForumRoutes.js";
import NoticeRoutes from "./routes/dashboard/NoticesRoutes.js";
import ReportRoutes from "./routes/dashboard/ReportRoutes.js";

//home routes
import homeRoutes from "./routes/homeRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import volumeRoutes from "./routes/volumeRoutes.js";
// import volumeCommentRoutes from "./routes/volumeCommentRoutes.js";
import chatboxRoutes from "./routes/chatboxRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import noticesRoutes from "./routes/noticesRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"


// load biến môi trường
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//dashboard routes
app.use("/dashboard/user", UserRoutes) // dashboard/user
app.use("/dashboard/book", BookRoutes) // dashboard/book
app.use("/dashboard/category", CategoryRoutes) // dashboard/category
app.use("/dashboard/volume", VolumeRoutes) // dashboard/volume
app.use("/dashboard/volumeComment", VolumeCommentRoutes) // dashboard/volumeComment
app.use("/dashboard/chatbox", ChatboxRoutes) // dashboard/chatbox
app.use("/dashboard/forum", ForumRoutes) // dashboard/forum
app.use("/dashboard/notices", NoticeRoutes) // dashboard/notices
app.use("/dashboard/report", ReportRoutes) // dashboard/report

// home routes
app.use("/", homeRoutes);
app.use("/user", usersRoutes); // /user/tên user
app.use("/role", roleRoutes);
app.use("/category", categoryRoutes); // category/
app.use("/book", bookRoutes); // book/
app.use("/book/:slug", volumeRoutes); // book/:slug
// app.use("/book/:slug/:slugChapter", volumeCommentRoutes); // book/:slug/chapter-x cần fix
app.use("/chatbox", chatboxRoutes);
app.use("/forum", forumRoutes);
app.use("/notices", noticesRoutes);
app.use("/report", reportRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);


app.get("/connectDB", async (req, res) => {
  try {
    await connectDB.authenticate(); // kiểm tra kết nối
    res.json({ success: true, message: "Kết nối thành công với SQL Server!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Kết nối thất bại", error: err.message });
  }
});

app.get("/syncDB", async (req, res) => {
  try {
    await db.sequelize.sync({ alter: true }); // đồng bộ các model với database
    res.json({ success: true, message: "Đồng bộ database thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Đồng bộ database thất bại", error: err.message });
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
