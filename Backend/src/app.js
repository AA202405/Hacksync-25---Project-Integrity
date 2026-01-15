const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const auditRoutes = require('./features/agentic-audit/routes');
const documentRoutes = require('./features/document-analysis/routes');
const evidenceRoutes = require('./features/visual-evidence/routes');
const mapRoutes = require('./features/map/routes');
const reportRoutes = require('./features/report/routes');

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// API routes
app.use('/api/audit', auditRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/report', reportRoutes);

// GET /api/projects (alias for /api/audit/projects)
app.get('/api/projects', require('./features/agentic-audit/controller').getProjects);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.path}`,
    timestamp: new Date().toISOString()
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
