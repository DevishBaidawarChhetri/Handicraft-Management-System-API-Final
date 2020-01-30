const express = require('express');
const router = express.Router();
const userModel = require('../models/users');

router.route('/')
    .get(async (req, res)=>{
        try{
            const data = await userModel.find({})
            res.json({
                status: 200,
                isSuccess: true.image,
                data: data
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
        const data = new userModel({
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
            console.log('User Registered!')
        }
        catch(err){
            res.json({
                isSuccess:false,
                error: err,
                message: 'Something went wrong, user not registered'
            })
            console.log('User Registration failed.')
        }
    })
router.route('/login')
    .post(async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;

        try{
            const data = await userModel.findOne({email: email});
            // console.log(data);
            if(data!=null){
                if(password == data.password){
                    res.json({
                        status: 200,
                        isSuccess: true,
                        message: 'Welcome, '+ data.fullName
                    })
                }
                else{
                    res.json({
                        isSuccess: false,
                        message: 'Password incorrect'
                    })
                }
            }
            else{
                res.json({
                    isSuccess: false,
                    error: 'Please enter correct email'
                })
            }
        }
        catch(err){
            res.json({
                error: err,
                message: 'Something went wrong'
            })
        }
    })
router.route('/:id')
    .get(async (req, res)=>{
        try{
            const data = await userModel.findById({_id:req.params.id})
            res.json({
                status: 200,
                isSuccess: true,
                data: data,
                message: 'Fetched successfully'
            })
        }
        catch(err){
            res.json({
                isSuccess: false,
                error: err
            })
        }
    })
   
module.exports = router;