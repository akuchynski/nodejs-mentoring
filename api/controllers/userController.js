import { userService } from '../services/userService';

const create = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user.id);
    } catch (error) {
        return next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updatedRows = await userService.updateUser(req.params.id, req.body);
        if (updatedRows[0] === 1) {
            res.status(200).end();
        } else if (updatedRows[0] === 0) {
            res.status(204).end();
        }
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const deletedRowsCount = await userService.deleteUserById(req.params.id);
        if (deletedRowsCount === 1) {
            res.status(200).end();
        } else if (deletedRowsCount === 0) {
            res.status(204).end();
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
