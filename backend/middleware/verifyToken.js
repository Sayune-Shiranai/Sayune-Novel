//xác thực token

const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giả định JWT_SECRET trong .env
        req.user = decoded; // Thêm thông tin user vào req
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
module.exports = verifyToken;