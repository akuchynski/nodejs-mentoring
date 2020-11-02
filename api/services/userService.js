import { User, Group } from '../db/models';
import { logged } from '../utils/decorators/logged';
import createError from 'http-errors';

class UserService {
    @logged
    async createUser(requestBody) {
        const login = requestBody.login;
        const user = await User.findOne({
            where: {
                login
            }
        });
        if (user) {
            throw createError.Conflict(`User login ${login} already exists!`);
        } else {
            return User.create(requestBody);
        }
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
    async getUserByLoginPassword(login, password) {
        return User.findOne({
            where: {
                login,
                password
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
