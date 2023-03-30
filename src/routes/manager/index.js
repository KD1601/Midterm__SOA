const express = require('express');
const router = express.Router();
const managerController = require('../../controllers/manager.controller');

// Define your file routes here
// E.g:
router.get('/', managerController.index);
router.get('/sum-bill', managerController.toHandleSumBillPage);
router.get('/bill-history', managerController.toHandleBillHistoryPage);
router.get('/detail-order/:id', managerController.toHandleDetailOfBillPage);

module.exports = router;