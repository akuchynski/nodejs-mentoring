const Joi = require('@hapi/joi');

exports.schema = Joi.object().keys({
    login: Joi.string().alphanum().min(4).required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).alphanum().min(4).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});
