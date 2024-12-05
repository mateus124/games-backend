const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.BCRYPT_KEY;

verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido.", error: error });
  }
};

module.exports = {
  verifyToken,
};
