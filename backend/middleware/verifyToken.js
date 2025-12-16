//xác thực token
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }
};

export default verifyToken;