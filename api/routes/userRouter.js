const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const userSchema = require('../schemas/userSchema.js');
const validator = require('express-joi-validation').createValidator({});

router.route('/')
    .post(validator.body(userSchema.schema), userController.create)
    .get(userController.getAll);

router.route('/:id')
    .get(userController.getById)
    .put(validator.body(userSchema.schema), userController.update)
    .delete(userController.remove);

module.exports = router;
