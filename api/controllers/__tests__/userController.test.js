import { create, getAll, getById, update, remove } from '../userController';
import { mockResponse, mockRequest, mockNext } from '../__mocks__/expressMocks';
import { userService } from '../../services/userService';
import createError from 'http-errors';

jest.mock('../../services/userService');

describe('User Controller Tests', () => {
    const res = mockResponse();
    const req = mockRequest();
    const next = mockNext();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user #create', async () => {
        req.body = { login: 'user123', password: 'password123', age: 33 };
        const user = { id: 'uuid', ...req.body };
        userService.createUser.mockImplementation(() => Promise.resolve(user));
        await create(req, res, null);
        expect(res.json).toBeCalledWith(user.id);
        expect(userService.createUser).toBeCalledWith(req.body);
        expect(res.status).toBeCalledWith(201);
    });

    it('should throw error (Conflict 409) if user exists #create', async () => {
        const error = createError.Conflict();
        req.body = { login: 'user123', password: 'password123', age: 33 };
        userService.createUser.mockImplementation(() => Promise.reject(error));
        await create(req, null, next);
        expect(next).toBeCalledWith(error);
    });

    it('should update user #update', async () => {
        const updatedRows = [1];
        req.body = { login: 'user123', password: 'password123', age: 33 };
        req.params = { id: 'uuid' };
        userService.updateUser.mockImplementation(() => Promise.resolve(updatedRows));
        await update(req, res, null);
        expect(userService.updateUser).toBeCalledWith(req.params.id, req.body);
        expect(res.status).toBeCalledWith(200);
    });

    it('should return 204 status if user was not updated #update', async () => {
        const updatedRows = [0];
        req.body = { login: 'user123', password: 'password123', age: 33 };
        req.params = { id: 'uuid' };
        userService.updateUser.mockImplementation(() => Promise.resolve(updatedRows));
        await update(req, res, null);
        expect(userService.updateUser).toBeCalledWith(req.params.id, req.body);
        expect(res.status).toBeCalledWith(204);
    });

    it('should return users #getAll', async () => {
        const users = ['user1', 'user2', 'user3'];
        userService.getAllUsers.mockImplementation(() => Promise.resolve(users));
        await getAll(null, res, null);
        expect(res.json).toBeCalledWith(users);
        expect(res.status).toBeCalledWith(200);
    });

    it('should return user by id #getById', async () => {
        const user = { login: 'user123', password: 'password123', age: 33 };
        req.params = { id: 'uuid' };
        userService.getUserById.mockImplementation(() => Promise.resolve(user));
        await getById(req, res, null);
        expect(userService.getUserById).toBeCalledWith(req.params.id);
        expect(res.json).toBeCalledWith(user);
        expect(res.status).toBeCalledWith(200);
    });

    it('should return 404 status if user does not exist #getById', async () => {
        const user = null;
        req.params = { id: 'uuid' };
        userService.getUserById.mockImplementation(() => Promise.resolve(user));
        await getById(req, res, null);
        expect(userService.getUserById).toBeCalledWith(req.params.id);
        expect(res.status).toBeCalledWith(404);
    });

    it('should delete user by id #remove', async () => {
        const updatedRowsCount = 1;
        req.params = { id: 'uuid' };
        userService.deleteUserById.mockImplementation(() => Promise.resolve(updatedRowsCount));
        await remove(req, res, null);
        expect(userService.deleteUserById).toBeCalledWith(req.params.id);
        expect(res.status).toBeCalledWith(200);
    });

    it('should return 204 status if user was not deleted #remove', async () => {
        const updatedRowsCount = 0;
        req.params = { id: 'uuid' };
        userService.deleteUserById.mockImplementation(() => Promise.resolve(updatedRowsCount));
        await remove(req, res, null);
        expect(userService.deleteUserById).toBeCalledWith(req.params.id);
        expect(res.status).toBeCalledWith(204);
    });
});
