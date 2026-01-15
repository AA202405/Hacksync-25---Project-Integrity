const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST /api/evidence/verify
router.post('/verify', controller.verify);

module.exports = router;
