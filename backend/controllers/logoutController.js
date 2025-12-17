import db from "../models/index.js";

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await db.usersModel.findOne({
        where: { refreshToken },
      });

      if (user) {
        await db.usersModel.update(
          { refreshToken: null },
          { where: { id: user.id } }
        );
      }
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Đăng xuất thành công!",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      message: "Đăng xuất thất bại!",
    });
  }
}
