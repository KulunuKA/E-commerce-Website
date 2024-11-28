const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  images: {
    required: true,
    type: Array,
  },
  price: {
    required: true,
    type: Number,
  },

  description: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
  material: {
    required: true,
    type: String,
  },
  weight: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  size: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
    enum: ["Male", "Female", "Kids", "Unisex"],
  },
  available: {
    required: true,
    type: Boolean,
    default: true,
  },
  stock: {
    required: true,
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
