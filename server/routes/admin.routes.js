const express = require("express");
const {
  postProduct,
  getProductWithQuery,
  getOneProduct,
  updateAvailable,
} = require("../controllers/product.controllers");
const { postAdmin, logAdmin } = require("../controllers/admin.controllers");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

const AdminRouter = router;
AdminRouter.post("/register", postAdmin);
AdminRouter.post("/login", logAdmin);
AdminRouter.post("/addProduct", adminAuth, postProduct);
AdminRouter.get("/getproducts", adminAuth, getProductWithQuery);
AdminRouter.put("/updateProduct/:id", adminAuth, updateAvailable);

module.exports = { AdminRouter };
