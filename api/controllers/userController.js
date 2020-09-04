const { models } = require('../db');

async function create(req, res) {
    const user = await models.user.findOne({ where: { login: req.body.login } });
    if (user) {
        res.status(409).send(`User login ${req.body.login} already exists!`);
    }
    try {
        await models.user.create(req.body);
        res.status(201);
    } catch (error) {
        console.log(error);
    }
}

async function getAll(req, res) {
    const users = await models.user.findAll();
    res.status(200).json(users);
}

async function getById(req, res) {
    const user = await models.user.findByPk(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send(`User with id ${req.params.id} not found!`);
    }
}

async function update(req, res) {
    const user = await models.user.findByPk(req.params.id);
    if (!user) {
        res.status(404).send(`User with id ${req.params.id} not found!`);
    }
    try {
        await models.user.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200);
    } catch (error) {
        console.log(error);
    }
}

async function remove(req, res) {
    await models.user.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
