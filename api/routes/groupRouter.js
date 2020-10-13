import express from 'express';
import { create, getAll, getById, update, remove, addUsers } from '../controllers/groupController';
import { groupSchema } from '../schemas/groupSchema';

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/')
    .post(validator.body(groupSchema), create)
    .get(getAll);

router.route('/:id')
    .get(getById)
    .put(validator.body(groupSchema), update)
    .delete(remove);

router.route('/add/:id')
    .put(addUsers);

export default router;
