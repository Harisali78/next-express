const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  rating: Number,
  review: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
