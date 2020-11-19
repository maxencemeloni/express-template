const express = require('express');
const router = express.Router();
const TimeController = require('../controllers/time.controller');

router.get('/', TimeController.getCET);
router.get('/east', TimeController.getEAST);


module.exports = router;
