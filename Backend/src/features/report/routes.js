const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST /api/report/generate
router.post('/generate', controller.generateReport);

module.exports = router;
