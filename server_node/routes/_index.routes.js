const { Router } = require("express");
const UserRouter = require("./user.routes");
const CartRouter = require("./cart.routes");
const { AdminRouter } = require("./admin.routes");
const OrderRouter = require("./Order.routes");

const router = Router();

router.use("/users/", UserRouter);
router.use("/cart", CartRouter);
router.use("/admin", AdminRouter);
router.use("/order", OrderRouter);

module.exports = router;
