import { Op } from 'sequelize';
import { sequelize } from '../db/index';
import { Group, User } from '../db/models';
import { logged } from '../utils/decorators/logged';

class GroupService {
    @logged
    async createGroup(requestBody) {
        return Group.create(requestBody);
    }

    @logged
    async getGroupById(id) {
        return Group.findOne({
            where: {
                id
            },
            include: {
                model: User
            }
        });
    }

    @logged
    async getGroupByName(name) {
        return Group.findOne({
            where: {
                name
            },
            include: {
                model: User
            }
        });
    }

    @logged
    async getAllGroups() {
        return Group.findAll({
            include: {
                model: User
            }
        });
    }

    @logged
    async updateGroup(id, requestBody) {
        return Group.update(requestBody, {
            where: {
                id
            }
        });
    }

    @logged
    async deleteGroupById(id) {
        return Group.destroy({
            where: {
                id
            }
        });
    }

    @logged
    async addUsersToGroup(id, userIds) {
        const group = await Group.findOne({
            where: {
                id
            },
            include: {
                model: User
            }
        });

        const usersList = await User.findAll({
            where: {
                id: { [Op.in]: userIds }
            }
        });

        if (usersList.length === 0) {
            throw ({ status: 404, code: 'USER_NOT_EXISTS', message: `Users dont exist. Check input data. userIds: ${userIds}` });
        }

        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            await group.addUsers(usersList, { transaction });
            await transaction.commit();
            return await group.reload();
        } catch (err) {
            await transaction.rollback();
        }
    }
}

export const groupService = new GroupService();
