import { groupService } from '../services/groupService';
const createError = require('http-errors');

const create = async (req, res, next) => {
    try {
        const group = await groupService.getGroupByName(req.body.name);
        if (group) {
            throw createError.Conflict(`Group name ${req.body.login} already exists!`);
        } else {
            const groupData = await groupService.createGroup(req.body);
            res.status(201).json(groupData.id);
        }
    } catch (error) {
        return next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const groups = await groupService.getAllGroups();
        res.json(groups);
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (group) {
            res.json(group);
        } else {
            throw createError.NotFound(`Group id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (group) {
            await groupService.updateGroup(req.params.id, req.body);
            await group.reload();
            res.json(group);
        } else {
            throw createError.NotFound(`Group id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (group) {
            await groupService.deleteGroupById(req.params.id);
            res.status(200).end();
        } else {
            throw createError.NotFound(`Group id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const addUsers = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (group) {
            const groupUpdated = await groupService.addUsersToGroup(req.params.id, req.body.usersIds);
            res.json(groupUpdated);
        } else {
            throw createError.NotFound(`Group id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

export {
    addUsers,
    create,
    getAll,
    getById,
    update,
    remove
};
