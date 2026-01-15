const express = require('express');
const router = express.Router();
const controller = require('./controller');

// GET /api/map-data
router.get('/data', controller.getMapData);

module.exports = router;
