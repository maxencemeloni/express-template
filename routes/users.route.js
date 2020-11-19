const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router
    .get('/', UsersController.find)
    .get('/:id', UsersController.findOne)
    .post('/',
        [
            body('email').isEmail(),
            body('password').isLength({ min: 8 })
        ],
        UsersController.createOne)
    .patch('/:id',
        [
            body('email').optional().isEmail(),
            body('password').optional().isLength({ min: 8 })
        ],
        UsersController.updateOne)
    .delete('/:id', UsersController.deleteOne);

module.exports = router;
