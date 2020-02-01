const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Include Routes start //
const userRoute = require('./routes/users');
const userImgUpload = require('./user_img_upload');
// Includes Routes end //

// Databases connection start //
const url = 'mongodb://localhost:27017/sampleAPI';
const connect = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

connect.then((db)=>{
    console.log("Successfully connected to mongodb server...");
}, (err) =>{
    console.log(err);
});
// Databases connection end //

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes start //
app.use('/user', userRoute);
app.use('/userImage', userImgUpload);
// Routes end //

// Server port start //
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () =>{
    console.log(`Server started at port ${port}...`);
});
// Server port end //