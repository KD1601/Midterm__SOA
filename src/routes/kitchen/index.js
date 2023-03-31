const express = require('express');
const router = express.Router();
const kitchenController = require('../../controllers/kitchen.controller');

// Define your file routes here
// E.g:
router.get('/', kitchenController.index);
router.get('/handle-order', kitchenController.toHandleOrderPage);
router.post('/handle-order', kitchenController.completeOrder);
router.get('/handle-order/:id', kitchenController.toHandleDetailOrderPage);
router.get('/handle-food', kitchenController.toHandleFoodPage);
router.post('/handle-food', kitchenController.changeFoodStatus);

module.exports = router;