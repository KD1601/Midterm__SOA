const express = require('express');
const router = express.Router();
const accountRouter = require('./account');
const fileRouter = require('./file');

router.use('/account', accountRouter);
router.use('/file', fileRouter);

module.exports = router;