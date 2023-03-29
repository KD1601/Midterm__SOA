const express = require('express');
const router = express.Router();
const kitchenController = require('../../controllers/kitchen.controller');

// Define your file routes here
// E.g:
router.get('/', kitchenController.index);
router.get('/handle-order', kitchenController.toHandleOrderPage);
router.get('/handle-food', kitchenController.toHandleFoodPage);

module.exports = router;