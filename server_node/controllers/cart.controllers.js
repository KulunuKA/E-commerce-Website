const Cart = require("../model/Cart");
const User = require("../model/User");

const addCart = async (req, res) => {
  if (
    !req.body.quantity ||
    !req.body.price ||
    !req.params.productID ||
    !req.body.name ||
    !req.body.image
  ) {
    return res.status(400).send({
      data: {},
      msg: "Missing required fields",
      code: 400,
    });
  }

  const cartItem = {
    productID: req.params.productID,
    name: req.body.name,
    image: req.body.image,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  const cart = new Cart({
    owner: req.user._id,
    items: [cartItem],
    productID: req.params.productID,
  });
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        data: {},
        msg: "User not found",
        code: 404,
      });
    }
    const cartCount = user.cartItemCount + req.body.quantity;
    await User.findByIdAndUpdate(req.user._id, {
      cartItemCount: cartCount,
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
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).send({
        data: {},
        msg: "Cart not found",
        code: 404,
      });
    }
    const user = await User.findById(cart.owner);
    const cartCount = user.cartItemCount - cart.items[0].quantity;
    await User.findByIdAndUpdate(cart.owner, {
      cartItemCount: cartCount,
    });
    res.status(200).send({
      data: cart,
      msg: "Cart deleted",
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

module.exports = { addCart, getCart, deleteCart };
