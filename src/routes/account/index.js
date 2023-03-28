const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/account.controller');

// Define your account routes here
// E.g:
router.get('/', accountController.get);


module.exports = router;