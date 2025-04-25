const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const err = new Error("Validation failed");
        err.statusCode = 422;
        err.data = error.array();
        throw err;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        return user.save();
    }).then(result => {
        res.status(201).json({message: "Created", userId: result._id});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}