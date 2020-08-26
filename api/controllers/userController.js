const User = require('../models/user.js');
const uuid = require('uuid');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'User content can not be empty!'
        });
    }
    const user = new User(
        uuid.v4(),
        req.body.login,
        req.body.password,
        req.body.age,
        req.body.isDeleted
    );
    user.save();
    res.redirect('/users');
};

exports.findAll = (req, res) => {
    res.json(User.getAllUsers());
};

exports.findOne = (req, res) => {
    const user = User.findUserById(req.params.id);
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        res.json(user);
    }
};

exports.update = (req, res) => {
    const user = User.findUserById(req.params.id);
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        const userData = new User(
            req.params.id,
            req.body.login,
            req.body.password,
            req.body.age,
            req.body.isDeleted
        );
        User.updateUser(userData);
        res.redirect('/users');
    }
};

exports.delete = (req, res) => {
    const user = User.findUserById(req.params.id);
    if (user === undefined || user.isDeleted) {
        res.status(400)
            .json({ message: `User with id ${req.params.id} not found!` });
    } else {
        User.removeUser(user);
        res.redirect('/users');
    }
};
