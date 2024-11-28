const Order = require('../model/Order')

const postOrder = async (req,res) => {
 const order = new Order(req.body)
 try {
    await order.save();
    res.status(201).send(order)

 } catch (error) {
    res.status(400).send(error) 
}
}

module.exports ={postOrder}