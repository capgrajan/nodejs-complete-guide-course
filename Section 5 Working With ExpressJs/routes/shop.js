const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log("route to -> /");
    console.log(adminData.products);
    // res.send('<h1>Hello from Express</h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;