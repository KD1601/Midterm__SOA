const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const kitchenRouter = require('./kitchen');

router.use('/home', homeRouter);
router.use('/kitchen', kitchenRouter);

module.exports = router;