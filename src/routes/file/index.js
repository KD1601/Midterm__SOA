const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/file.controller');

// Define your file routes here
// E.g:
router.get('/', fileController.get);


module.exports = router;