const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

// Define your account routes here
// E.g:
router.get('/', homeController.index);
router.get('/open-table', homeController.getListTable);  
router.post('/login', homeController.handleLogin);
router.get('/login', homeController.login);



module.exports = router;