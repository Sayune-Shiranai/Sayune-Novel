import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

import dashboardCategoryRoutes from "./routes/dashboard/dashboardCategoryRoutes.js";

import homeRoutes from "./routes/homeController.js";
import usersRoutes from "./routes/usersRoutes.js";
// import roleRoutes from "./routes/roleRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
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

app.use("/dashboard/category", dashboardCategoryRoutes) // dashboard/category

app.use("/", homeRoutes);
app.use("/user", usersRoutes); // /user/tên user
// app.use("/role", roleRoutes);
// app.use("/category", categoryRoutes);
app.use("/book/:slug", bookRoutes); // book/:slug
app.use("/book/:slug/:slugChapter", volumeRoutes); // book/:slug/chapter-x
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

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
