# Project Integrity Backend API

Complete Node.js backend API for the Project Integrity frontend application. This backend provides endpoints for agentic audit, document analysis, visual evidence verification, map data, and report generation.

## Features

- **Agentic Audit System**: Three-agent sequential processing (retrieval → audit → verdict)
- **Document Analysis**: OCR simulation with field extraction
- **Visual Evidence Verification**: EXIF analysis, tampering detection, issue identification
- **Map Data**: Project locations with verdict and risk scores
- **Report Generation**: Complaint letters and RTI requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```
   PORT=8000
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Start the Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

4. **Verify Server is Running**
   
   Visit `http://localhost:8000/health` in your browser or use curl:
   ```bash
   curl http://localhost:8000/health
   ```

## API Endpoints

### Health Check
- **GET** `/health` - Server health check

### Agentic Audit
- **POST** `/api/audit/run` - Run audit on a project
  ```json
  {
    "project_id": "PRJ-2024-0847",
    "location": { "lat": 19.1136, "lng": 72.8697 },
    "evidence_data": [] // optional
  }
  ```

- **GET** `/api/audit/projects` - Get all projects
- **GET** `/api/projects` - Alias for above

### Document Analysis
- **POST** `/api/document/analyze` - Analyze uploaded document
  - Form data: `document` (file), `document_type` (optional: tender/completion/budget/contract/inspection)

### Visual Evidence
- **POST** `/api/evidence/verify` - Verify uploaded image
  - Form data: `image` (file)

### Map Data
- **GET** `/api/map/data` - Get map data with projects and locations

### Report Generation
- **POST** `/api/report/generate` - Generate complaint or RTI report
  ```json
  {
    "audit_data": { /* audit result data */ },
    "type": "complaint" // or "rti"
  }
  ```

## Response Format

All endpoints return responses in the following format:

**Success:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Project Structure

```
backend/
├── src/
│   ├── server.js                    # Express server entry point
│   ├── app.js                       # Express app configuration
│   ├── middleware/
│   │   ├── errorHandler.js          # Global error handler
│   │   └── uploadConfig.js           # Multer file upload config
│   ├── utils/
│   │   └── responseFormatter.js      # Response formatting utility
│   └── features/
│       ├── agentic-audit/
│       │   ├── routes.js
│       │   ├── controller.js
│       │   ├── agents/
│       │   │   ├── retrieval_agent.js
│       │   │   ├── audit_agent.js
│       │   │   └── verdict_agent.js
│       │   └── data/
│       │       ├── official_db.json
│       │       └── sample_evidence.json
│       ├── document-analysis/
│       │   ├── routes.js
│       │   ├── controller.js
│       │   ├── service.js
│       │   └── mockData.js
│       ├── visual-evidence/
│       │   ├── routes.js
│       │   ├── controller.js
│       │   └── service.js
│       ├── map/
│       │   ├── routes.js
│       │   └── controller.js
│       └── report/
│           ├── routes.js
│           ├── controller.js
│           └── templates/
│               ├── complaintTemplate.js
│               └── rtiTemplate.js
├── uploads/
│   ├── documents/                   # Uploaded documents
│   └── images/                     # Uploaded images
├── package.json
└── README.md
```

## Mock Data

The backend uses mock data for demonstration:

- **Official Database**: `src/features/agentic-audit/data/official_db.json`
  - Contains 18+ infrastructure projects across Mumbai
  - Includes project details, budgets, contractors, locations, status

- **Sample Evidence**: `src/features/agentic-audit/data/sample_evidence.json`
  - Contains 12+ evidence records
  - Includes issue types, severity, locations, timestamps

## Agentic Audit Flow

1. **Retrieval Agent** (1-2s delay)
   - Fetches official project records from database
   - Matches by project_id or location

2. **Audit Agent** (2-3s delay)
   - Compares official records vs evidence
   - Detects discrepancies:
     - Completion date vs evidence timestamp
     - Budget vs quality indicators
     - Claimed status vs actual evidence
     - Drainage integration issues

3. **Verdict Agent** (1-2s delay)
   - Calculates risk score (0-10)
   - Classifies verdict: Compliant/Suspect/Non-Compliant
   - Generates explanation and recommendations

**Total Processing Time**: 5-8 seconds with progress logs

## File Uploads

- Documents: Saved to `uploads/documents/`
  - Accepted: PDF, PNG, JPG, JPEG
  - Max size: 20MB

- Images: Saved to `uploads/images/`
  - Accepted: PNG, JPG, JPEG
  - Max size: 10MB

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (default Vite dev server)

To change this, update `CORS_ORIGIN` in `.env`

## Development Notes

- All delays are simulated for realistic API behavior
- Mock data provides varied responses based on input patterns
- Confidence scores range from 88-97% for AI outputs
- Risk scores are calculated on 0-100 scale for frontend compatibility

## Testing

Test endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:8000/health

# Get projects
curl http://localhost:8000/api/projects

# Run audit
curl -X POST http://localhost:8000/api/audit/run \
  -H "Content-Type: application/json" \
  -d '{"project_id": "PRJ-2024-0847"}'

# Get map data
curl http://localhost:8000/api/map/data
```

## Troubleshooting

1. **Port already in use**: Change `PORT` in `.env`
2. **CORS errors**: Verify `CORS_ORIGIN` matches frontend URL
3. **File upload fails**: Check `uploads/` directory permissions
4. **Module not found**: Run `npm install`

## License

ISC
