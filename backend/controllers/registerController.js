// tính năng đăng ký
import usersModel from "../models/users.js";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const JWT_SECRET = process.env.JWT_SECRET;


// Register user
export async function register (req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username)
    return res.status(400).json({ field: "username", message: "Tên đăng nhập không được để trống!" });

  if (!email)
    return res.status(400).json({ field: "email", message: "Email không được để trống!" }); 

  if (!password)
      return res.status(400).json({ field: "password", message: "Mật khẩu không được để trống!" });

  if (password.length < 6)
      return res.status(400).json({ field: "password", message: "Mật khẩu phải có ít nhất 6 ký tự!" });

  if (!confirmPassword)
      return res.status(400).json({ field: "confirmPassword", message: "Xác nhận mật khẩu không được để trống!" });

  if (password !== confirmPassword)
      return res.status(400).json({ field: "confirmPassword", message: "Nhập lại mật khẩu không khớp!" });

  const checkEmail = await usersModel.findOne({ where: { email } });
  if (checkEmail)
    return res.status(400).json({ field: "email", message: "Email đã tồn tại!" });

  const checkUser = await usersModel.findOne({ where: { username } });
  if (checkUser)
    return res.status(400).json({ field: "username", message: "Tài khoản đã tồn tại!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await usersModel.create({ 
    username, 
    email, 
    password: hashedPassword 
  });
    return res.status(201).json({ 
      message: 'Tạo user thành công!', 
      user: { id: user.id, username: user.username, email: user.email }, 
    });
}

