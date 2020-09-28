import { Op } from 'sequelize';
import { sequelize } from '../db/index';
import { Group, User }  from '../db/models';

class GroupService {
    async createGroup(requestBody) {
        return Group.create(requestBody);
    }

    async getGroupById(id) {
        return Group.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User
                }
            ]
        });
    }

    async getGroupByName(name) {
        return Group.findOne({
            where: {
                name
            },
            include: [
                {
                    model: User
                }
            ]
        });
    }

    async getAllGroups() {
        return Group.findAll({
            include: [
                {
                    model: User
                }
            ]
        });
    }

    async updateGroup(id, requestBody) {
        return Group.update(requestBody, {
            where: {
                id
            }
        });
    }

    async deleteGroupById(id) {
        return Group.destroy({
            where: {
                id
            }
        });
    }

    async addUsersToGroup(id, userIds) {
        const group = await Group.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User
                }
            ]
        });

        const usersList = await User.findAll({
            where: {
                id: { [Op.in]: userIds }
            }
        });

        if (usersList.length === 0) {
            throw Error(`Users dont exist. userIds: ${userIds}`);
        }

        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            await group.addUsers(usersList, { transaction });
            await group.addUsers(usersList, { transaction });
            await transaction.commit();
            return await group.reload();
        } catch (err) {
            await transaction.rollback();
        }
    }
}

export const groupService = new GroupService();
