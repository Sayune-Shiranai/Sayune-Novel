import usersModel from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

// Login user
export async function login (req, res) {
  const { username, password } = req.body;

  if (!username)
    return res.status(400).json({ field: "username", message: "Vui lòng nhập tên đăng nhập!" });

  if (!password)
      return res.status(400).json({ field: "password", message: "Vui lòng nhập mật khẩu!" });

  const user = await usersModel.findOne({ where: { username } });

  if (user) {
      //example bcrypt.compare("123456", "$2b$10$gSY0P4HkHnNR3qDnPKhLVeFbf...vSVK/UZb4qB0E6") 
    //bcrypt sẽ hash lại "123456" theo cùng cơ chế salt và so sánh với chuỗi hash trong DB.
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const accessToken = jwt.sign(
        { username: user.username, role: user.role_id },
        JWT_SECRET,
        { expiresIn: "1m" }
      );

      const refreshToken = jwt.sign(
        { username: user.username, role: user.role_id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      await usersModel.update(
        { refreshToken: refreshToken },
        { where: { id: user.id } }
      );

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      return res.status(200).json({ 
        message: "Đăng nhập thành công!", 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          role_id: user.role_id,
        }, 
        accessToken,
        refreshToken
      });
    }else {
      return res.status(400).json({ field: "password", message: "Mật khẩu không đúng!" });
    }
  }else {
    return res.status(400).json({ field: "username", message: "Tài khoản không tồn tại!" });
  }
}