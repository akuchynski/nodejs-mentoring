import UserModel from "../db/models/user.model";

class UserService {
    async createUser(requestBody) {
        return UserModel.create(requestBody);
    }

    async getUserById(id) {
        return UserModel.findOne({
            where: {
                id
            }
        });
    }

    async getUserByLogin(login) {
        return UserModel.findOne({
            where: {
                login
            }
        });
    }

    async getAllUsers() {
        return UserModel.findAll();
    }

    async updateUser(id, requestBody) {
        return UserModel.update(requestBody, {
            where: {
                id
            }
        });
    }

    async deleteUserById(id) {
        return UserModel.destroy({
            where: {
                id
            }
        });
    }
}

export const userService = new UserService();
