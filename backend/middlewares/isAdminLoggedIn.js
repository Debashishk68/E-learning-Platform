const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function isAdminLoggedIn(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        message: "Access denied. No token provided.",
        isAuthenticated: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).send({
        message: "User not found.",
        isAuthenticated: false,
      });
    }

    if (user.role !== "admin") {
      return res.status(403).send({
        message: "Access denied. Admins only.",
        isAuthenticated: false,
      });
    }

    // Pass user info to next middleware/controller
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({
        error: "Invalid token",
        isAuthenticated: false,
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        error: "Token expired",
        isAuthenticated: false,
      });
    } else {
      return res.status(500).send({
        error: "Server error",
        isAuthenticated: false,
      });
    }
  }
}

module.exports = isAdminLoggedIn;
