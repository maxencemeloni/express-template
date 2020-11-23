const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const {body} = require('express-validator');
router
    .get('/', UsersController.find)
    .get('/:id', UsersController.findById)
    .post('/', [
        body('email').isEmail(),
        body('password').isLength({min: 8})
    ], UsersController.createOne)
    .patch('/:id', [
        body('email').isEmail(),
        body('password').isLength({min: 8})
    ], UsersController.updateOne)
    .delete('/:id', UsersController.deleteOne);

module.exports = router;
