const express = require("express");
const categoryRoutes = express.Router();

const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");       // JWT verify karne ke liye
const isAdmin = require("../middleware/isAdmin"); // Sirf admin allow karega

// Public route: sab categories dekh sakte hain
categoryRoutes.get("/", auth, isAdmin, categoryController.getAllCategories);

// Public route: ek category by id dekhna
categoryRoutes.get("/:id", auth,isAdmin, categoryController.getCategoryById);

// Admin only routes (category create, update, delete)
categoryRoutes.post("/", auth, isAdmin, categoryController.createCategory);
categoryRoutes.put("/:id", auth, isAdmin, categoryController.updateCategory);
categoryRoutes.delete("/:id", auth, isAdmin, categoryController.deleteCategory);

module.exports = categoryRoutes;
