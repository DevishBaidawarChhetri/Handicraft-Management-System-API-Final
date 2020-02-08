const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
    productName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    originalPrice:{
        type: String,
        required: true
    },
    discountedPrice:{
        type: String
    }
}, {timestamps: true});

const product = mongoose.model('products', productSchema);
module.exports = product;