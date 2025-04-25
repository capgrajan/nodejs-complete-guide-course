const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feeds');

const app = express();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// });
app.use('/feed', feedRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
} );

mongoose.connect(
    'mongodb+srv://learninguser:Rd1HyYzVvVdFjk40@learning.dvnmcr3.mongodb.net/messages?retryWrites=true&w=majority&appName=learning'
).then(result => {
    app.listen(8080)
}).catch(error => console.log("Monogo DB Connection Error: ", error));