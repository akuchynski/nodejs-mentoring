import express from 'express';
import { create, getAll, getById, update, remove } from '../controllers/userController';
import { userSchema } from '../schemas/userSchema';

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/')
    .post(validator.body(userSchema), create)
    .get(getAll);

router.route('/:id')
    .get(getById)
    .put(validator.body(userSchema), update)
    .delete(remove);

export default router;
