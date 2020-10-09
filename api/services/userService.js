import { User, Group } from '../db/models';
import { logged } from '../utils/decorators/logged';
const jwt = require('jsonwebtoken');

class UserService {
    @logged
    async authenticateUser(login, password) {
        const user = await User.findOne({
            where: {
                login,
                password
            }
        });

        if (!user) {
            throw ({ status: 403, code: 'USER_NOT_AUTHENTICATED', message: 'Username or password is incorrect' });
        }
        const payload = { 'sub': user.id, 'isDeleted': user.isDeleted };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: parseInt(process.env.TOKEN_EXPIRE_TIME, 10) });
        return token;
    }

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
