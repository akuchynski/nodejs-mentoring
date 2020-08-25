const User = require('../models/user.js');

exports.create = function (req, res) {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty!"
        });
    }
    const user = new User(
        req.body.id,
        req.body.name,
        req.body.age
    );
    user.save();
    res.redirect("/users");
};

exports.findAll = function (req, res) {
    res.json(User.getAllUsers());
};

exports.findOne = function (req, res) {
    let user = User.findUserById(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json(user)
    }
};

exports.update = function (req, res) {
    let user = User.findUserById(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } if (req.body.name === undefined || req.body.age === undefined) {
        res.status(400)
            .json({ message: `Please check name : ${req.body.id} and age : ${req.body.id} values!` });
    } else {
        const user = new User(
            req.params.id,
            req.body.name,
            req.body.age
        );
        user.update();
        res.redirect("/users");
    }
};

exports.delete = function (req, res) {
    let user = User.findUserByIdAndRemove(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json({ message: `User with id ${req.params.id} was removed successfully!` })
    }
};
