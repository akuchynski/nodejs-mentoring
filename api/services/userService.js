import { User, Group } from '../db/models';
import { logged } from '../utils/decorators/logged';

class UserService {
    @logged
    async createUser(requestBody) {
        return User.create(requestBody);
    }

    @logged
    async getUserById(id) {
        return User.findOne({
            where: {
                id
            },
            include: {
                model: Group
            }
        });
    }

    @logged
    async getUserByLogin(login) {
        return User.findOne({
            where: {
                login
            },
            include: {
                model: Group
            }
        });
    }

    @logged
    async getAllUsers() {
        return User.findAll({
            include: {
                model: Group
            }
        });
    }

    @logged
    async updateUser(id, requestBody) {
        return User.update(requestBody, {
            where: {
                id
            }
        });
    }

    @logged
    async deleteUserById(id) {
        return User.destroy({
            where: {
                id
            }
        });
    }
}

export const userService = new UserService();
