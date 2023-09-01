const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  // productDetails,
  // updateProduct,
  // deletedProduct,
  // authMiddleware,
} = require("../controllers/product");

router.get("/products", getProducts);
router.post("/createProduct", createProduct);
router.get("/product/:id", productDetails);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deletedProduct);

module.exports = router;
