import db from "../models/index.js";
import jwt from "jsonwebtoken";
import AsyncLock from 'async-lock';
const lock = new AsyncLock();

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(req, res, next) {
  console.log("Cookie accessToken:", req.cookies.accessToken);
  console.log("Cookie refreshToken:", req.cookies.refreshToken);

  if (req.cookies && req.cookies.accessToken) {
    req.user = null;
    const currentUrl = req.url;
    try {
      // Xác thực token
      const CheckAccessToken = await jwt.verify(
        req.cookies.accessToken,
        JWT_SECRET
      );
      req.user = CheckAccessToken;
      console.log("AccessToken hợp lệ:", CheckAccessToken);

      console.log("Giá trị của currentUrl:", currentUrl);
      return next();
    } catch (error) {
      console.log("Giá trị của currentUrl:", currentUrl);

      //kiểm tra refresh token
      if (req.cookies.refreshToken) {
        console.log("Giá trị của cookie refreshToken:", req.cookies.refreshToken);
        try {
          const CheckRefreshToken = jwt.verify(
            req.cookies.refreshToken,
            JWT_SECRET
          );
          req.user = CheckRefreshToken;
          console.log(CheckRefreshToken);
          await lock.acquire(`refresh_lock_${CheckRefreshToken.id}`, async () => {
            console.log("Xác thực refresh token thành công!")

            const User = await db.usersModel.findOne({
              where: { id: CheckRefreshToken.id },
            });

            if (!User) {
              res.clearCookie("accessToken");
              res.clearCookie("refreshToken");
              return res.status(401).send({ message: "User không tồn tại" });
            }
            
            console.log("Giá trị của cookie.refreshToken:", req.cookies.refreshToken);
            console.log("Giá trị của User.refreshToken:", User.refreshToken);

            // Kiểm tra nếu refresh token hợp lệ
            if (User && User.refreshToken === req.cookies.refreshToken) {
              console.log("Giá trị của User.username:", User.username);
              console.log("Giá trị của User.role:", User.role_id);
              // Tạo Access Token mới
              const newAccessToken = jwt.sign(
                { 
                  id: User.id, 
                  username: User.username, 
                  role: User.role_id 
                },
                JWT_SECRET,
                { expiresIn: "1m" }
              );

              // Tạo Refresh Token mới
              const newRefreshToken = jwt.sign(
                { 
                  id: User.id, 
                  username: User.username, 
                  role: User.role_id 
                },
                JWT_SECRET,
                { expiresIn: "7d" }
              );

              const UpdateRefreshToken = await db.usersModel.update(
                { refreshToken: newRefreshToken },
                { where: { id: User.id } }
              );

              console.log("UpdateRefreshToken:", UpdateRefreshToken);

              // Gửi Access Token mới về client
              res.cookie("accessToken", newAccessToken, { 
                  httpOnly: true,
                  sameSite: "lax",
                  path: "/",
              });
              console.log("Giá trị của newAccessToken:", newAccessToken);

              res.cookie("refreshToken", newRefreshToken, {
                  httpOnly: true,
                  sameSite: "lax",
                  path: "/",
              });
              console.log("Giá trị của newRefreshToken mới:", newRefreshToken);

              req.user = {
                id: User.id,
                username: User.username,
                role: User.role_id,
              };

              //vị trí hiện tai url
              console.log("Giá trị của currentUrl:", currentUrl);

              console.log("Xác thực user thành công!")
              
            } else {
              console.log("Request song song phát hiện: Đã có luồng khác cập nhật token.");
              // Gán user từ DB để đi tiếp vào Controller, không cần tạo mới nữa
              req.user = { id: User.id, username: User.username, role: User.role_id };
            }
          });
          return next();
        } catch (err) {
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          return res.status(401).send({
              message: "Token hết hạn!",
          });
        }
      } else {
        return res.status(401).send({ 
          message: "Lỗi xác thực refresh token!" 
        });
      }
    }
  } else {
    return res.status(401).send({ 
      message: "Chưa đăng nhập" 
    });
  }
}