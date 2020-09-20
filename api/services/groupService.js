import { Sequelize } from 'sequelize';
import GroupModel from '../db/models/group.model';
import UserModel from '../db/models/user.model';
// import { sequelize } from '../db/index';

class GroupService {
    async createGroup(requestBody) {
        return GroupModel.create(requestBody);
    }

    async getGroupById(id) {
        return GroupModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: UserModel
                }
            ]
        });
    }

    async getGroupByName(name) {
        return GroupModel.findOne({
            where: {
                name
            },
            include: [
                {
                    model: UserModel
                }
            ]
        });
    }

    async getAllGroups() {
        return GroupModel.findAll({
            include: [
                {
                    model: UserModel
                }
            ]
        });
    }

    async updateGroup(id, requestBody) {
        return GroupModel.update(requestBody, {
            where: {
                id
            }
        });
    }

    async deleteGroupById(id) {
        return GroupModel.destroy({
            where: {
                id
            }
        });
    }

    async addUsersToGroup(id, userIds) {
        const group = await GroupModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: UserModel,
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        const usersList = await UserModel.findAll({
            where: {
                id: { [Sequelize.Op.in]: userIds }
            }
        });

        await group.addUsers(usersList);
        await group.save();
    }
}

export const groupService = new GroupService();
