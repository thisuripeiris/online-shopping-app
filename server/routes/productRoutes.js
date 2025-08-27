import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsBySubCategory,
  getProductsByCategory,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Fetch products by category (resin / non-resin)
router.get("/category/:category", getProductsByCategory);
// Fetch products by subCategory
router.get("/subcategory/:subCategory", getProductsBySubCategory);

// Add new product - Admin only
router.post("/", protect, admin, addProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
