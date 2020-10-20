import express from 'express';
import { login, refreshAccessToken } from '../controllers/authController';
import { refreshTokenSchema, userAuthSchema } from '../schemas/authSchema';

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/login')
    .post(validator.body(userAuthSchema), login);

router.route('/refresh-token')
    .post(validator.body(refreshTokenSchema), refreshAccessToken);

export default router;
