import express from 'express';
import { login, create, getAll, getById, update, remove } from '../controllers/userController';
import { userSchema, userAuthSchema } from '../schemas/userSchema';
import { authenticateToken } from '../middlewares/accessTokenHandler';

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/login')
    .post(validator.body(userAuthSchema), login);

router.use(authenticateToken);

router.route('/')
    .post(validator.body(userSchema), create)
    .get(getAll);

router.route('/:id')
    .get(getById)
    .put(validator.body(userSchema), update)
    .delete(remove);

export default router;
