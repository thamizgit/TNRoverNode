const express = require('express');

const router = express.Router();

const addUser = require('../../controllers/registerController');

router.post('/',addUser);

module.exports = router;