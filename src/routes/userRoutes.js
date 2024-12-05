const express = require("express");
const {
  createUser,
  updateUser,
  userLogin,
  deleteUser,
} = require("../controllers/userControl");
const { verifyToken } = require("../middlewares/authMiddleware");

const app = express.Router();

app.post("/user", createUser);

app.post("/user/login", userLogin);

app.patch("/user/:id", verifyToken, updateUser);

app.delete("/user/:id", verifyToken, deleteUser);

app.post("/user/logout", (req, res) => {
  res.status(200).json({ message: "Logout realizado. " });
});

module.exports = app;
