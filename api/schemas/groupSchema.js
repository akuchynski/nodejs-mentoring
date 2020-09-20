import Joi from '@hapi/joi';

const groupSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(4).required(),
    permissions: Joi.required()
});

export { groupSchema };
