const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router
    .get('/', UsersController.find)
    .get('/:id', UsersController.findOne)
    .post('/', UsersController.createOne)
    .patch('/:id', UsersController.updateOne)
    .delete('/:id', UsersController.deleteOne);

module.exports = router;
