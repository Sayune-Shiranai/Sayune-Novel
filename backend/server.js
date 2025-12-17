// sửa file này phải ib
import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import db from "./models/index.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // hoặc "http://localhost:5173"
  credentials: true,
}));



//dashboard routes
import RoleRoutes from "./routes/dashboard/RoleRoutes.js";
import UserRoutes from "./routes/dashboard/UsersRoutes.js";
import AuthorRoutes from "./routes/dashboard/AuthorRoutes.js";
import ArtistRoutes from "./routes/dashboard/ArtistRoutes.js";
import CategoryRoutes from "./routes/dashboard/CategoryRoutes.js";
import BookRoutes from "./routes/dashboard/BookRoutes.js";
import VolumeRoutes from "./routes/dashboard/VolumeRoutes.js";
import VolumePostRoutes from "./routes/dashboard/VolumePostRoutes.js";
import ChatboxRoutes from "./routes/dashboard/ChatboxRoutes.js";
import ForumRoutes from "./routes/dashboard/ForumRoutes.js";
import NoticesRoutes from "./routes/dashboard/NoticesRoutes.js";
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

//auth routes
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import logoutRoutes from "./routes/logoutRoutes.js";

// load biến môi trường
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

//dashboard routes
app.use("/dashboard/role", RoleRoutes); // dashboard/role
app.use("/dashboard/user", UserRoutes) // dashboard/user
app.use("/dashboard/author", AuthorRoutes) // dashboard/author
app.use("/dashboard/artist", ArtistRoutes) // dashboard/artist
app.use("/dashboard/category", CategoryRoutes) // dashboard/category
app.use("/dashboard/book", BookRoutes) // dashboard/book
app.use("/dashboard/book", VolumeRoutes) // dashboard/volume
app.use("/dashboard/volumeComment", VolumePostRoutes) // dashboard/VolumePost
app.use("/dashboard/chatbox", ChatboxRoutes) // dashboard/chatbox
app.use("/dashboard/forum", ForumRoutes) // dashboard/forum
app.use("/dashboard/notices", NoticesRoutes) // dashboard/notices
app.use("/dashboard/report", ReportRoutes) // dashboard/report

// home routes
app.use("/", homeRoutes);
app.use("/user", usersRoutes); // /user
app.use("/role", roleRoutes);
app.use("/category", categoryRoutes); // category
app.use("/book", bookRoutes); // book/
app.use("/book/:slug", volumeRoutes); // book/:slug
// app.use("/book/:slug/:slugChapter", volumeCommentRoutes); // book/:slug/chapter-x cần fix
app.use("/chatbox", chatboxRoutes);
app.use("/forum", forumRoutes);
app.use("/notices", noticesRoutes);
app.use("/report", reportRoutes);

//auth routes
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

app.get('/HelloWorld', (req, res) => {
  res.send('Hello World!')
})

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

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
