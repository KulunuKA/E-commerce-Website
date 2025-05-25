const express = require("express");
const {
  addCart,
  getCart,
  deleteCart,
} = require("../controllers/cart.controllers");
const auth = require("../middleware/auth");
const router = express.Router();

const CartRouter = router;

CartRouter.post("/addCart/:productID", auth, addCart);
CartRouter.get("/getCart/:id", auth, getCart);
CartRouter.delete("/delete/:id",auth, deleteCart);

module.exports = CartRouter;
