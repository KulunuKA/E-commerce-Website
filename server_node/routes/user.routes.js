// require('../controllers/user.controllers');
const express = require("express");
const {
  postUser,
  getUser,
  logUser,
  getProducts,
  getOneProduct,
} = require("../controllers/user.controllers");
const router = express.Router();

const UserRouter = router;

UserRouter.post("/register", postUser);
UserRouter.get("/findUser", getUser);
UserRouter.post("/login", logUser);
UserRouter.get("/products", getProducts);
UserRouter.get("/getProduct/:id", getOneProduct);

module.exports = UserRouter;
