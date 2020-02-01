const express = require('express');
const router = express.Router();
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('express-jwt-middleware');
const bcrypt = require('bcryptjs');

const jwtCheck = jwtMiddleware('SecretKey');

router.route('/')
    .get(jwtCheck, async (req, res)=>{
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
        const hash = await bcrypt.hash(req.body.password, 10);
        const data = new userModel({
            image: req.body.image,
            fullName: req.body.fullName,
            email: req.body.email,
            telephone: req.body.telephone,
            address: req.body.address,
            gender: req.body.gender,
            password: hash
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
            const auth = bcrypt.compareSync(password, data.password);

            // console.log(data);
            if(data!=null){
                if(auth){
                    const token = jwt.sign({email: email}, 'SecretKey');
                    res.json({
                        status: 200,
                        isSuccess: true,
                        message: 'Welcome, '+ data.fullName,
                        token: token
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
    .get(jwtCheck, async (req, res)=>{
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
    .put(jwtCheck, async (req, res)=>{
        const putData = userModel({
            image: req.body.image,
            fullName: req.body.fullName,
            email: req.body.email,
            telephone: req.body.telephone,
            address: req.body.address,
            gender: req.body.gender,
            password: req.body.password
        })
        try{
            const data = await userModel.updateOne({_id: req.params.id},
            {
                $set:{
                    image: req.body.image,
                    fullName: req.body.fullName,
                    email: req.body.email,
                    telephone: req.body.telephone,
                    address: req.body.address,
                    gender: req.body.gender,
                    password: req.body.password
                }
            })
            res.json({
                status: 200,
                isSuccess: true,
                formData: putData,
                data: data,
                message: 'User Successfully Updated.'
            })
        }
        catch(err){
            res.json({
                isSuccess: false,
                error: err,
                message: 'User Update failed.'
            })
        }
    })
    .delete(jwtCheck, async (req, res)=>{
        const data = await userModel.findOne({_id: req.params.id});
        try{
            if(data!=null){
                const dataDelete = await userModel.deleteOne({_id: req.params.id})
                res.json({
                    status: 200,
                    isSuccess: true,
                    data: data,
                    message: 'Successfully deleted'
                })
            }
            else{
                res.json({
                    status: 410,
                    isSuccess: false,
                    data: data,
                    message: 'No data found'
                })
            }
        }
        catch(err){
            res.json({
                status: 500,
                isSuccess: false,
                error: err,
                message: 'Internal Server Error'
            })
        }
    })
module.exports = router;