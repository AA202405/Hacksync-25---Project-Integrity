const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST /api/document/analyze
router.post('/analyze', controller.analyze);

module.exports = router;
