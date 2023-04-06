const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

router.get('/', homeController.index);
router.get('/home/:filter?', homeController.home);
router.get('/api/home/:filter?', homeController.homeAPI);
// router.get('/home/:filter', homeController.home);
router.post('/home', homeController.completeOrder);
router.get('/open-table/:id', homeController.getListTable);
router.post('/open-table/:id', homeController.handleOpenTable);
router.get('/close-table', homeController.getListEndTable);
router.post('/close-table', homeController.handleCloseTable);
router.post('/close-tableEnd', homeController.handleCloseTableEnd);

module.exports = router;