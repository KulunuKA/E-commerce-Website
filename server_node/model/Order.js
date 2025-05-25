const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    firstName:{
        type:String,
        requires:true
    },
    lastName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postcode:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})

const Order = mongoose.model('Order' , orderSchema);

module.exports = Order;