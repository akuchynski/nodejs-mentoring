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
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json(user)
    }
};

exports.update = (req, res) => {
    let user = User.findUserById(req.params.id);
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        const user = new User(
            req.params.id,
            req.body.login,
            req.body.password,
            req.body.age,
            req.body.isDeleted
        );
        User.updateUser(user);
        res.redirect("/users");
    }
};

exports.delete = (req, res) => {
    let user = User.findUserById(req.params.id);
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        User.removeUser(user);
        res.json({ message: `User with id ${req.params.id} was removed successfully!` })
    }
};
