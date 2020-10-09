import { userService } from '../services/userService';

const login = async (req, res, next) => {
    try {
        const token = await userService.authenticateUser(req.body.login, req.body.password);
        res.send(token);
    } catch (error) {
        return next(error);
    }
};

const create = async (req, res, next) => {
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
            res.status(404).send(`User with id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
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
};

const remove = async (req, res, next) => {
    try {
        await userService.deleteUserById(req.params.id);
        res.status(200).end();
    } catch (error) {
        return next(error);
    }
};

export {
    login,
    create,
    getAll,
    getById,
    update,
    remove
};
