const express = require('express');
const { postOrder } = require('../controllers/Order.controllers');
const router = express.Router();

const OrderRouter = router;

OrderRouter.post('/postOrder', postOrder)

module.exports = OrderRouter;