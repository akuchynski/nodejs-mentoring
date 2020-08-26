const Joi = require('@hapi/joi');

exports.schema = Joi.object().keys({
    id: Joi.string().alphanum().required(),
    login: Joi.string().alphanum().min(4).required(),
    password: Joi.string().alphanum().min(4).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
})