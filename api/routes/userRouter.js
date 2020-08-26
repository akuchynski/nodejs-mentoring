const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const userSchema = require('../schemas/userSchema.js');
const validator = require('express-joi-validation').createValidator({});

router.route('/')
        .post(validator.body(userSchema.schema), userController.create)
        .get(userController.findAll);

router.route('/:id')
        .get(userController.findOne)
        .put(validator.body(userSchema.schema), userController.update)
        .delete(userController.delete);

module.exports = router;