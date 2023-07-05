const ROLES = {
    "User": "User",
    "Admin": "Admin"
}
const jwt = require('jsonwebtoken')
require('dotenv').config()






const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.PRIVATE_KEY, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const userRole = decodedToken.role;
            let role = req.headers.role
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            req.user = decodedToken;
            next();
        });
    };
};

module.exports = {
   
    ROLES,authorize
}