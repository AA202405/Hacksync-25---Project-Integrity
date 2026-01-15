const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST /api/audit/run
router.post('/run', controller.runAudit);

// GET /api/audit/projects
router.get('/projects', controller.getProjects);

module.exports = router;
