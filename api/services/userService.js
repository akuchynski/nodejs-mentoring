import { User, Group } from '../db/models';

class UserService {
    async createUser(requestBody) {
        return User.create(requestBody);
    }

    async getUserById(id) {
        return User.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Group
                }
            ]
        });
    }

    async getUserByLogin(login) {
        return User.findOne({
            where: {
                login
            },
            include: [
                {
                    model: Group
                }
            ]
        });
    }

    async getAllUsers() {
        return User.findAll({
            include: [
                {
                    model: Group
                }
            ]
        });
    }

    async updateUser(id, requestBody) {
        return User.update(requestBody, {
            where: {
                id
            }
        });
    }

    async deleteUserById(id) {
        return User.destroy({
            where: {
                id
            }
        });
    }
}

export const userService = new UserService();
