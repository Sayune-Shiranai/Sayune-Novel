import db from "../models/index.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(req, res, next) {
  // console.log("Cookie accessToken:", req.cookies.accessToken);
  // console.log("Cookie refreshToken:", req.cookies.refreshToken);

  // Kiểm tra xem có token không
  if (req.cookies && req.cookies.accessToken) {
    req.user = null;
    try {
      const decoded = jwt.verify(
        req.cookies.accessToken,
        JWT_SECRET
      );
      req.user = decoded;
      console.log(decoded);
      return next();
    } catch (error) {
      console.log({ message: "Token không hợp lệ" });
    }
  }

  // Nếu token không hợp lệ, kiểm tra refreshToken
  const currentUrl = req.url;
  console.log("Giá trị của currentUrl:", currentUrl);

  if (req.cookies.refreshToken) {
    console.log("Giá trị của refreshToken:", req.cookies.refreshToken);
    try {
      const decodedRefresh = jwt.verify(
        req.cookies.refreshToken,
        JWT_SECRET
      );
      req.user = decodedRefresh;
      console.log(decodedRefresh);

      const storedUser = await db.usersModel.findOne({
        where: { id: decodedRefresh.id },
      });
      console.log("Giá trị của storedUser:", storedUser);
      console.log(
        "Giá trị của storedUser.refreshToken:",
        storedUser.refreshToken
      );

      if (!storedUser) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).send({ message: "User không tồn tại" });
      }
      
      console.log("Giá trị của cookie.refreshToken:", req.cookies.refreshToken);
      console.log("Giá trị của storedUser.refreshToken cũ:", storedUser.refreshToken);
      console.log("Giá trị của storedUser:", storedUser);
      // Kiểm tra nếu refresh token hợp lệ
      if (storedUser && storedUser.refreshToken === req.cookies.refreshToken) {

        // Tạo Access Token mới
        const newToken = jwt.sign(
          { 
            id: storedUser.id, 
            username: storedUser.username, 
            role: storedUser.role_id 
          },
          JWT_SECRET,
          { expiresIn: "1m" }
        );

        console.log("Giá trị của storedUser.username:", storedUser.username);
        console.log("Giá trị của storedUser.role:", storedUser.role_id);

        // Tạo Refresh Token mới
        const newRefreshToken = jwt.sign(
          { 
            id: storedUser.id, 
            username: storedUser.username, 
            role: storedUser.role_id 
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        await db.usersModel.update(
          { refreshToken: newRefreshToken },
          { where: { id: storedUser.id } }
        );

        // Gửi Access Token và Refresh Token mới về client
        res.cookie("accessToken", newToken, { 
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        });
        console.log("Giá trị của newToken:", newToken);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        });
        console.log("Giá trị của newRefreshToken mới:", newRefreshToken);

        // Lưu thông tin người dùng vào request
        req.user = {
          id: storedUser.id,
          username: storedUser.username,
          role: storedUser.role_id,
        };
        
        console.log("Giá trị của currentUrl:", currentUrl);
        // return reply.redirect(currentUrl);
      } else {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).send({
          message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!",
        });
      }
    } catch (err) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).send({
            message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!",
        });
    }
  } else {
    return res.status(401).send({ message: "Chưa đăng nhập" });
  }
}

