const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const fileRouter = require('./file');

router.use('/home', homeRouter);
router.use('/file', fileRouter);

module.exports = router;