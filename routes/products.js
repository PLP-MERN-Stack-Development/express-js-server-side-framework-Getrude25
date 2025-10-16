import express from "express";
import { v4 as uuidv4 } from "uuid";
import { validateProduct } from "../middleware/validateProduct.js";
import { NotFoundError } from "../middleware/errorHandler.js";

const router = express.Router();

let products = [];

// ✅ GET /api/products (with filtering, pagination, and search)
router.get("/", (req, res) => {
  let filtered = [...products];
  const { category, search, page = 1, limit = 5 } = req.query;

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated,
  });
});

// ✅ GET /api/products/:id
router.get("/:id", (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
});

// ✅ POST /api/products
router.post("/", validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT /api/products/:id
router.put("/:id", validateProduct, (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));

  const { name, description, price, category, inStock } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.inStock = inStock ?? product.inStock;

  res.json(product);
});

// ✅ DELETE /api/products/:id
router.delete("/:id", (req, res, next) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) return next(new NotFoundError("Product not found"));
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// ✅ GET /api/products/stats/category
router.get("/stats/category", (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

export default router;
