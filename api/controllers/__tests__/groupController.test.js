import { create, getAll, getById, update, remove, addUsers } from '../groupController';
import { mockResponse, mockRequest, mockNext } from '../__mocks__/expressMocks';
import { groupService } from '../../services/groupService';
import createError from 'http-errors';

jest.mock('../../services/groupService');

describe('Group Controller Tests', () => {
    const res = mockResponse();
    const req = mockRequest();
    const next = mockNext();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#create function', () => {
        it('should create a new group', async () => {
            req.body = { name: 'group123' };
            const group = { id: 'uuid', ...req.body };
            groupService.createGroup.mockImplementation(() => Promise.resolve(group));
            await create(req, res, null);
            expect(res.json).toBeCalledWith(group.id);
            expect(groupService.createGroup).toBeCalledWith(req.body);
            expect(res.status).toBeCalledWith(201);
        });

        it('should throw error (Conflict 409) if group exists', async () => {
            const error = createError.Conflict();
            req.body = { name: 'group123' };
            groupService.createGroup.mockImplementation(() => Promise.reject(error));
            await create(req, null, next);
            expect(next).toBeCalledWith(error);
        });
    });

    describe('#update function', () => {
        it('should update group', async () => {
            const updatedRows = [1];
            req.body = { name: 'group123' };
            req.params = { id: 'uuid' };
            groupService.updateGroup.mockImplementation(() => Promise.resolve(updatedRows));
            await update(req, res, null);
            expect(groupService.updateGroup).toBeCalledWith(req.params.id, req.body);
            expect(res.status).toBeCalledWith(200);
        });

        it('should return 204 status if group was not updated', async () => {
            const updatedRows = [0];
            req.body = { name: 'group123' };
            req.params = { id: 'uuid' };
            groupService.updateGroup.mockImplementation(() => Promise.resolve(updatedRows));
            await update(req, res, null);
            expect(groupService.updateGroup).toBeCalledWith(req.params.id, req.body);
            expect(res.status).toBeCalledWith(204);
        });
    });

    describe('#getAll function', () => {
        it('should return groups', async () => {
            const groups = ['group1', 'group2', 'group3'];
            groupService.getAllGroups.mockImplementation(() => Promise.resolve(groups));
            await getAll(null, res, null);
            expect(res.json).toBeCalledWith(groups);
            expect(res.status).toBeCalledWith(200);
        });
    });

    describe('#getById function', () => {
        it('should return group by id', async () => {
            const group = { name: 'group123' };
            req.params = { id: 'uuid' };
            groupService.getGroupById.mockImplementation(() => Promise.resolve(group));
            await getById(req, res, null);
            expect(groupService.getGroupById).toBeCalledWith(req.params.id);
            expect(res.json).toBeCalledWith(group);
            expect(res.status).toBeCalledWith(200);
        });

        it('should return 404 status if group does not exist', async () => {
            const group = null;
            req.params = { id: 'uuid' };
            groupService.getGroupById.mockImplementation(() => Promise.resolve(group));
            await getById(req, res, null);
            expect(groupService.getGroupById).toBeCalledWith(req.params.id);
            expect(res.status).toBeCalledWith(404);
        });
    });

    describe('#remove function', () => {
        it('should delete group by id', async () => {
            const updatedRowsCount = 1;
            req.params = { id: 'uuid' };
            groupService.deleteGroupById.mockImplementation(() => Promise.resolve(updatedRowsCount));
            await remove(req, res, null);
            expect(groupService.deleteGroupById).toBeCalledWith(req.params.id);
            expect(res.status).toBeCalledWith(200);
        });

        it('should return 204 status if group was not deleted', async () => {
            const updatedRowsCount = 0;
            req.params = { id: 'uuid' };
            groupService.deleteGroupById.mockImplementation(() => Promise.resolve(updatedRowsCount));
            await remove(req, res, null);
            expect(groupService.deleteGroupById).toBeCalledWith(req.params.id);
            expect(res.status).toBeCalledWith(204);
        });
    });

    describe('#addUsers function', () => {
        it('should add users to group', async () => {
            const group = { name: 'group123' };
            req.body = { 'usersIds': ['user1_uuid', 'user2_uuid'] };
            req.params = { id: 'uuid' };
            groupService.addUsersToGroup.mockImplementation(() => Promise.resolve(group));
            await addUsers(req, res, null);
            expect(groupService.addUsersToGroup).toBeCalledWith(req.params.id, req.body.usersIds);
            expect(res.status).toBeCalledWith(200);
        });

        it('should throw error (NotFound 404) if group does not exist', async () => {
            const error = createError.NotFound();
            req.body = { 'usersIds': ['user1_uuid', 'user2_uuid'] };
            req.params = { id: 'uuid' };
            groupService.addUsersToGroup.mockImplementation(() => Promise.reject(error));
            await addUsers(req, null, next);
            expect(next).toBeCalledWith(error);
        });

        it('should throw error (BadRequest 400) if usersIds are not exist', async () => {
            const error = createError.BadRequest();
            req.body = { 'usersIds': ['user1_uuid', 'user2_uuid'] };
            req.params = { id: 'uuid' };
            groupService.addUsersToGroup.mockImplementation(() => Promise.reject(error));
            await addUsers(req, null, next);
            expect(next).toBeCalledWith(error);
        });
    });
});
