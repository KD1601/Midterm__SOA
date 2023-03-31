const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

// Define your account routes here
// E.g:
router.get('/', homeController.index);
router.get('/home', homeController.home);
router.get('/open-table', homeController.getListTable);  
router.post('/open-table', homeController.handleOpenTable);  
router.get('/close-table', homeController.getListEndTable);  
router.post('/close-table', homeController.handleCloseTable);
router.post('/close-tableEnd', homeController.handleCloseTableEnd);
router.post('/login', homeController.handleLogin);
router.get('/login', homeController.login);



module.exports = router;