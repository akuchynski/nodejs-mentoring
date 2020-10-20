import Joi from '@hapi/joi';

const userAuthSchema = Joi.object().keys({
    login: Joi.string().alphanum().min(4).required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).alphanum().min(4).required()
});

const refreshTokenSchema = Joi.object().keys({
    refreshToken: Joi.string().required()
});

export { userAuthSchema, refreshTokenSchema };
