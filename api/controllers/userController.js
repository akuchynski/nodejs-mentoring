const { models } = require('../db');

async function create(req, res, next) {
    try {
        const user = await models.user.findOne({
            where: {
                login: req.body.login
            }
        });
        if (user) {
            res.status(409).send(`User login ${req.body.login} already exists!`);
        } else {
            const userCreated = await models.user.create(req.body);
            res.status(201).json(userCreated.id);
        }
    } catch (error) {
        return next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await models.user.findAll();
        res.json(users);
    } catch (error) {
        return next(error);
    }
}

async function getById(req, res, next) {
    try {
        const user = await models.user.findByPk(req.params.id);
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
        const user = await models.user.findByPk(req.params.id);
        if (!user) {
            res.status(404).send(`User with id ${req.params.id} not found!`);
        } else {
            await models.user.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            await user.reload();
            res.json(user);
        }
    } catch (error) {
        return next(error);
    }
}

async function remove(req, res, next) {
    try {
        await models.user.destroy({
            where: {
                id: req.params.id
            }
        });
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
