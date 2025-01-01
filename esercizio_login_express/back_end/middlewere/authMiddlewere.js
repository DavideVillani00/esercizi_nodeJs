const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const authMid = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "token mancante" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "token non valido" });
    }
    req.user = user;
    next();
  });
};

module.exports = authMid;
