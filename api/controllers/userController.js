const { userService } = require('../services/userService');

async function create(req, res, next) {
    try {
        const user = await userService.getUserByLogin(req.body.login);
        if (user) {
            res.status(409).send(`User login ${req.body.login} already exists!`);
        } else {
            const userData = await userService.createUser(req.body);
            res.status(201).json(userData.id);
        }
    } catch (error) {
        return next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        return next(error);
    }
}

async function getById(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send(`User with id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send(`User with id ${req.params.id} not found!`);
        } else {
            await userService.updateUser(req.params.id, req.body);
            await user.reload();
            res.json(user);
        }
    } catch (error) {
        return next(error);
    }
}

async function remove(req, res, next) {
    try {
        await userService.deleteUserById(req.params.id);
        res.status(200).end();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
