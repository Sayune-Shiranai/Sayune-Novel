// tính năng đăng ký, đăng nhập
import usersModel from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Tạo người dùng mới
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

export async function login (req, res) {
    const { username, password } = req.body;

    if (!username)
      return res.status(400).json({ field: "username", message: "Vui lòng nhập tên đăng nhập!" });

    if (!password)
        return res.status(400).json({ field: "password", message: "Vui lòng nhập mật khẩu!" });

    const user = await usersModel.findOne({ where: { username } });
    if (!user)
      return res.status(400).json({ field: "username", message: "Tài khoản không tồn tại!" });

    //example bcrypt.compare("123456", "$2b$10$gSY0P4HkHnNR3qDnPKhLVeFbf...vSVK/UZb4qB0E6") 
    //bcrypt sẽ hash lại "123456" theo cùng cơ chế salt và so sánh với chuỗi hash trong DB.
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(400).json({ field: "password", message: "Mật khẩu không đúng!" });

        const accessToken = jwt.sign(
          { username: user.username, role: user.role },
          { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
          { username: user.username, role: user.role },
          { expiresIn: "7d" }
        );

    return res.status(200).json({ 
      message: "Đăng nhập thành công!", 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      }, 
      accessToken,
      refreshToken
    });
}
