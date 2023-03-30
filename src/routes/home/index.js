const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

// Define your account routes here
// E.g:
router.get('/', homeController.index);
router.get('/login', homeController.login);
router.get('/register', homeController.register);



module.exports = router;