const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

router.get('/', homeController.index);
router.get('/home/:filter?', homeController.home);
router.get('/api/home/:filter?', homeController.homeAPI);

// router.get('/home/:filter', homeController.home);
router.post('/home', homeController.completeOrder);

router.get('/open-table/:id', homeController.getListTable);
router.get('/api/open-table/:id?', homeController.getListTableApi);


router.post('/open-table/:id', homeController.handleOpenTable);
router.post('/api/open-table/:id', homeController.handleOpenTableAPI);

router.get('/close-table', homeController.getListEndTable);
router.get('/api/close-table', homeController.getListEndTableApi);

router.post('/close-table', homeController.handleCloseTable);
router.post('/api/close-table', homeController.handleCloseTableAPI);

router.post('/close-tableEnd', homeController.handleCloseTableEnd);
router.post('/api/close-tableEnd', homeController.handleCloseTableEndAPI);

module.exports = router;