const { models } = require('../db');

async function create(req, res) {
    try {
        await models.user.create(req.body);
        res.status(201).end();
    } catch (error) {
        console.log(error);
    }
}

async function getAll(req, res) {
    console.log(models);
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
        res.status(400).send(`User with id ${req.params.id} not found!`);
    }
    try {
        await models.user.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).end();
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
    res.status(200).end();
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
