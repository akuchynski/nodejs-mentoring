import { groupService } from '../services/groupService';

const create = async (req, res, next) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json(group.id);
    } catch (error) {
        return next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(200).json(groups);
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updatedRows = await groupService.updateGroup(req.params.id, req.body);
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
        const deletedRowsCount = await groupService.deleteGroupById(req.params.id);
        if (deletedRowsCount === 1) {
            res.status(200).end();
        } else if (deletedRowsCount === 0) {
            res.status(204).end();
        }
    } catch (error) {
        return next(error);
    }
};

const addUsers = async (req, res, next) => {
    try {
        const groupUpdated = await groupService.addUsersToGroup(req.params.id, req.body.usersIds);
        res.status(200).json(groupUpdated);
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
