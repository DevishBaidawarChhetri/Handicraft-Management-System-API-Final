const express = require('express');
const router = express.Router();
const contactModel = require('../models/users');

router.route('/')
    .get(async (req, res)=>{
        try{
            const data = await contactModel.find({})
            res.json({
                data: data,
                isSuccess: true
            })
        }
        catch(err){
            res.json({
                isSuccess: false,
                error: err
            })
        }
    })
    .post(async (req, res)=>{
        const data = new contactModel({
            image: req.body.image,
            fullName: req.body.fullName,
            email: req.body.email,
            telephone: req.body.telephone,
            address: req.body.address,
            gender: req.body.gender,
            password: req.body.password
        })
        try{
            const postData = await data.save()
            res.json({
                status: 200,
                data: postData,
                isSuccess: true,
                message: 'Successfully inserted'
            })
        }
        catch(err){
            res.json({
                error: err,
                message: 'Something went wrong'
            })
        }
    })

module.exports = router;