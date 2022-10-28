const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const AUTH_TOKEN = process.env.AUTH_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${AUTH_TOKEN}`);
    const userId = decodedToken.userId;
    const keyRef = decodedToken.keyRef;
    const isAdmin = decodedToken.isAdmin;
    req.auth = {
      userId: userId,
      keyRef: keyRef,
      isAdmin: isAdmin,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
