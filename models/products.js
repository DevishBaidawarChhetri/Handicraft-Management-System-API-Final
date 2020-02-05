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
        type: Text,
        required: true
    },
    originalPrice:{
        type: Number,
        required: true
    },
    discountedPrice:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const product = mongoose.model('products', productSchema);
module.exports = product;