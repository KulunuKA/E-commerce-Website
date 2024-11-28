const Product = require("../model/Product");
const User = require("../model/User");

const postUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({
      data: user,
      code: 200,
      msg: "User created successfully",
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(409).send({
        data: {},
        code: 409,
        msg: "User with this email is already registered",
      });
    } else {
      console.log(error);
      res.status(400).send({
        data: {},
        code: 400,
        msg: "Server error",
      });
    }
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(401).send(error);
  }
};

const logUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const { _id, email,role,cartItemCount } = user;
    const token = await user.generateAuthToken();

    res.status(200).send({
      data: {
        id: _id,
        role: role,
        email: email,
        token: token,
        cartItemCount: cartItemCount,
      },
      code: 200,
      msg: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      data: {},
      code: error.statusCode || 400,
      msg: error.message || "Login failed",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).limit(req.query.limit);
    res.status(200).send({
      data: products,
      code: 200,
      msg: "Products fetched successfully",
    });
  } catch (error) {
    res.status(401).send({
      data: {},
      code: 401,
      msg: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      res.status(404).send({
        data: {},
        code: 404,
        msg: "Product Not Found",
      });
    } else {
      res.status(200).send({
        data: product,
        code: 200,
        msg: "Product Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      code: 500,
      msg: "Server Error",
    });
  }
};


module.exports = { postUser, getUser, logUser, getProducts,getOneProduct };
