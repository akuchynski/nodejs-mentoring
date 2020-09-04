const { models } = require('../db');

class UserService {
    async createUser(requestBody) {
        return models.user.create(requestBody);
    }

    async getUserById(id) {
        return models.user.findOne({
            where: {
                id
            }
        });
    }

    async getUserByLogin(login) {
        return models.user.findOne({
            where: {
                login
            }
        });
    }

    async getAllUsers() {
        return models.user.findAll();
    }

    async updateUser(id, requestBody) {
        return models.user.update(requestBody, {
            where: {
                id
            }
        });
    }

    async deleteUserById(id) {
        return models.user.destroy({
            where: {
                id
            }
        });
    }
}

export const userService = new UserService();
