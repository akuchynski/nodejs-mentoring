const User = require('../models/user.js');

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty!"
        });
    }
    const user = new User(
        req.body.id,
        req.body.login,
        req.body.password,
        req.body.age,
        req.body.isDeleted
    );
    user.save();
    res.redirect("/users");
};

exports.findAll = (req, res) => {
    res.json(User.getAllUsers());
};

exports.findOne = (req, res) => {
    let user = User.findUserById(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json(user)
    }
};

exports.update = (req, res) => {
    let user = User.findUserById(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } if (req.body.login === undefined || req.body.age === undefined) {
        res.status(400)
            .json({ message: `Please check login : ${req.body.login} value!` });
    } else {
        const user = new User(
            req.params.id,
            req.body.login,
            req.body.password,
            req.body.age,
            req.body.isDeleted
        );
        user.updateUser();
        res.redirect("/users");
    }
};

exports.delete = (req, res) => {
    let user = User.findUserByIdAndRemove(req.params.id);
    if (user === undefined) {
        res.status(404)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json({ message: `User with id ${req.params.id} was removed successfully!` })
    }
};
