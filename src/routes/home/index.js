const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

// Define your account routes here
// E.g:
router.get('/', homeController.index);


module.exports = router;