const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Include Routes start //
const userRoute = require('./routes/users');
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
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true }));

// Routes start //
app.use('/user', userRoute);
// Routes end //

// Server port start //
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () =>{
    console.log(`Server started at port ${port}...`);
});
// Server port end //