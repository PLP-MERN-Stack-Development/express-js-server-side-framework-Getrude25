import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/products.js";
import { logger } from "./middleware/logger.js";
import { authenticate } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT =process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);
app.use(authenticate);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.use("/api/products", productRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`));