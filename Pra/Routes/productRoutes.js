const express = require("express");
const productRoutes = express.Router();
const auth = require("../middleware/auth");
const {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require("../controllers/productController");
const isAdmin = require("../middleware/isAdmin");

// Middleware for authentication
productRoutes.use(auth);

// Create product (Manager-only)
productRoutes.post("/", isAdmin, createProduct);

// Get all products
productRoutes.get("/", isAdmin, getAllProducts);

// Get product by ID
productRoutes.get("/:id", isAdmin, getProductById);

// Update product
productRoutes.put("/:id", updateProduct);

// Delete product
productRoutes.delete("/:id", isAdmin, deleteProduct);

module.exports = productRoutes;
