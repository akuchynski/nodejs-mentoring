import { userService } from '../services/userService';
const createError = require('http-errors');

const create = async (req, res, next) => {
    try {
        const user = await userService.getUserByLogin(req.body.login);
        if (user) {
            throw createError.Conflict(`User login ${req.body.login} already exists!`);
        } else {
            const userData = await userService.createUser(req.body);
            res.status(201).json(userData.id);
        }
    } catch (error) {
        return next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            throw createError.NotFound(`User id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            await userService.updateUser(req.params.id, req.body);
            await user.reload();
            res.json(user);
        } else {
            throw createError.NotFound(`User id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            await userService.deleteUserById(req.params.id);
            res.status(200).end();
        } else {
            throw createError.NotFound(`User id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

export {
    create,
    getAll,
    getById,
    update,
    remove
};
