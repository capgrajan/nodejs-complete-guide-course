const path = require('path');
const rootDir = require('../util/path');
const products = [];

exports.getAddProduct = (req, res, next) => {
    console.log("Add product page");
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    products.push({title: req.body.title})
    console.log(req.body);
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    console.log("route to -> /");
    console.log(products);
    // res.send('<h1>Hello from Express</h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}