const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  oneProduct,
} = require("../controllers/productControl");
const { verifyToken } = require("../middlewares/authMiddleware");

const app = express.Router();

app.post("/product", verifyToken, createProduct);

app.patch("/product/:id", verifyToken, updateProduct);

app.delete("/product/:id", verifyToken, deleteProduct);

app.get("/product/all", allProducts);

app.get("/product/:id", oneProduct);

module.exports = app;
