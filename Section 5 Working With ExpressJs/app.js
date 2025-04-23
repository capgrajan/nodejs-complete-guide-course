const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("In Middleware");
    next(); // Allow request to go to the next middleware in line.
});

app.use((req, res, next) => {
    console.log("In another Middleware");
    return res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);
