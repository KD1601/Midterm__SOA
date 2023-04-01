const express = require('express');
const router = express.Router();
const managerController = require('../../controllers/manager.controller');

// Define your file routes here
// E.g:
router.get('/', managerController.index);
router.get('/sum-bill', managerController.toHandleSumBillPage);
router.get('/bill-history', managerController.toHandleBillHistoryPage);
router.post('/bill-history', managerController.toSelectYear);
router.get('/detail-order/:id', managerController.toHandleDetailOfBillPage);
router.get('/:id', managerController.index);

module.exports = router;