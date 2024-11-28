const Cart = require("../model/Cart");
const User = require("../model/User");

const addCart = async (req, res) => {
  if (!req.body.quantity || !req.body.price || !req.params.productID) {
    return res.status(400).send({
      data: {},
      msg: "quantity, price, productID are required",
      code: 400,
    });
  }

  const cartItem = {
    productID: req.params.productID,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  const cart = new Cart({
    owner: req.user._id,
    items: [cartItem],
    productID: req.params.productID,
  });
  try {
    await User.findByIdAndUpdate(req.user._id, {
      cartItemCount: req.body.quantity,
    });
    await cart.save();

    res.status(201).send({
      data: cart,
      msg: "success",
      code: 201,
    });
  } catch (error) {
    res.status(400).send({
      data: {},
      msg: error.message,
      code: 400,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const carts = await Cart.find({ owner: req.params.id });
    res.status(200).send({
      data: carts,
      msg: "success",
      code: 200,
    });
  } catch (error) {
    res.status(400).send({
      data: {},
      msg: error,
      code: 400,
    });
  }
};


const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete({ _id: req.params.id });
    if (!cart) {
      res.status(404).send();
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { addCart, getCart, deleteCart };
