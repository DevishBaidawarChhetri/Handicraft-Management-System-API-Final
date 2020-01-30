const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Routes start //

// Routes end //
const app = new express();
app.use(bodyParser.json());
app.use(cors());

// Server port start //
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () =>{
    console.log(`Server started at port ${port}...`);
});
// Server port end //