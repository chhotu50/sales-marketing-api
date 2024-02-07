const jwt = require("jsonwebtoken");
const { response } = require("../utils/response");
const { ROLES } = require("../config");
module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.json(response({ message: "Auth Error" }));
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;
    if (req.user.role !== ROLES.ADMIN) {
      return res.json(response({ message: "Unauthorized user" }));
    }
    req.method === "POST"
      ? (req.body["created_by_user_id"] = req.user._id)
      : "";
    next();
  } catch (e) {
    return res.json(response({ message: "Invalid Token" }));
  }
};
