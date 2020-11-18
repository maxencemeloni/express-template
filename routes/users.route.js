const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router.get('/', UsersController.find);
router.get('/:id', UsersController.findOne);
router.post('/', UsersController.createOne);
router.patch('/', UsersController.updateOne);
router.put('/', UsersController.updateOne);
router.delete('/:id', UsersController.updateOne);

module.exports = router;
