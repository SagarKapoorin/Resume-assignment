# Resume Backend Assignment

## Made by: Sagar Kapoor
## Live Deployment
**Live Link:** [[Add live URL here]](https://resume-assignment-tgln.onrender.com)

## API Testing
**Postman Collection:** [[Add Postman collection URL here]](https://backend-assignment-1872.postman.co/workspace/Backend-Assignment-Workspace~febad29e-0b72-4fb1-8a8e-33ee4ddcbd01/request/32093952-44f13996-858e-4a24-8668-97bde10cf36e?action=share&creator=32093952&ctx=documentation)

This is a backend assignment for a resume data enrichment API. The API allows users to log in, process resumes from PDF files, store extracted data in MongoDB, and retrieve stored information using search functionality.

## Features
- **User Authentication**: Login via `/api/login` using hardcoded credentials.
- **Resume Enrichment**: Submit a PDF URL to `/api/resume/enrich` to extract and store data.
- **Data Encryption**: Name and email are hashed using AES-256-CBC before storing.
- **Search Functionality**: Search stored resumes by full or partial name using `/api/resume/search`.
- **Performance Optimization**: Uses PM2 for clustering.
- **Rate Limiting**: Implements Redis for request rate limiting.

## API Endpoints
### 1. User Login
- **Endpoint:** `POST /api/login`
- **Request Body:**
  ```json
  {
    "username": "naval.ravikant",
    "password": "05111974"
  }
  ```
- **Response:** JWT Token on successful authentication.

### 2. Resume Enrichment
- **Endpoint:** `POST /api/resume/enrich`
- **Request Body:**
  ```json
  {
    "url": "<PDF_FILE_URL>"
  }
  ```
- **Response:** JSON object with extracted and hashed data.

### 3. Search Resume
- **Endpoint:** `POST /api/resume/search`
- **Request Body:**
  ```json
  {
    "name": "<NAME OR HASHED NAME>"
  }
  ```
- **Response:** List of resumes matching the search criteria.

## Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Redis** for rate limiting
- **PM2** for process management
- **Gemini-Pro API** for text extraction
- **AES-256-CBC** for encryption

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/SagarKapoorin/Resume-assignment.git
   ```
2. Install dependencies:
   ```sh
   cd Resume-assignment
   npm install
   ```
3. Create a `.env` file and add your configurations:
   ```env
   PORT=3000
   MONGO_URL="<your_mongo_connection_string>"
   GEMINI_API_KEY="<your_gemini_api_key>"
   redisUrl="redis://localhost:6379/"
   ENCRYPTION_KEY="<your_256-bit_encryption_key>"
   JWT_SECRET="<your_jwt_secret>"
   ```
4. Start the server using PM2:
   ```sh
    npm run start
   ```
