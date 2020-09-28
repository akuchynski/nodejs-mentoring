import { groupService } from '../services/groupService';

const create = async (req, res, next) => {
    try {
        const group = await groupService.getGroupByName(req.body.name);
        if (group) {
            res.status(409).send(`Group name ${req.body.name} already exists!`);
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
            res.status(404).send(`Group with id ${req.params.id} not found!`);
        }
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (!group) {
            res.status(404).send(`Group with id ${req.params.id} not found!`);
        } else {
            await groupService.updateGroup(req.params.id, req.body);
            await group.reload();
            res.json(group);
        }
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await groupService.deleteGroupById(req.params.id);
        res.status(200).end();
    } catch (error) {
        return next(error);
    }
};


const addUsers = async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (!group) {
            res.status(404).send(`Group with id ${req.params.id} not found!`);
        } else {
            const groupUpdated = await groupService.addUsersToGroup(req.params.id, req.body.usersIds);
            res.json(groupUpdated);
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
