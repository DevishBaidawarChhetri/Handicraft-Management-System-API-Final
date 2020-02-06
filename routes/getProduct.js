const express = require('express');
const Product = require('../models/products');
const router = express.Router();
router.route('/')
    .get((req,res,next)=>{
        Product.find({})
            .then((products) => {
                res.json(products);
            })
            .catch((err) => next(err));
    })
module.exports = router;