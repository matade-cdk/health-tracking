# ArogyaLink Web Platform

> Doctor dashboard and backend API for the ArogyaLink health tracking system

## Overview

The web platform consists of two main components:
1. **Frontend** - React-based doctor dashboard for patient management
2. **Backend** - Node.js/Express API server with MongoDB

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Frontend Guide](#frontend-guide)
- [Backend Guide](#backend-guide)

## Features

### Frontend (Doctor Dashboard)
- Modern gradient-based UI with dark theme
- Patient management system
- Health trends visualization with recharts
- Add/update patient health data
- Send notifications to patients
- Secure doctor authentication
- Multi-line health charts (Blood Pressure, Sugar, Heart Rate, Weight)
- Patient search and filtering

### Backend API
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Doctor authentication and management
- Patient data management
- Health records CRUD operations
- Push notification system
- CORS enabled for web/mobile access
- Fast and scalable architecture

## Tech Stack

### Frontend
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "recharts": "^2.15.0",
  "react-scripts": "5.0.1"
}
```

### Backend
```json
{
  "express": "^4.21.2",
  "mongoose": "^8.9.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7"
}
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB 6.0 or higher
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd web/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
# Create .env file
touch .env
```

Add the following to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/healthtracking
PORT=4000
```

4. **Start MongoDB**
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

5. **Run the server**
```bash
npm start
```

Server will start on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd web/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

Application will open on `http://localhost:3000`

## Project Structure

```
web/
├── backend/                    # Node.js Backend
│   ├── index.js               # Server entry point
│   ├── models.js              # MongoDB schemas
│   ├── create-test-patient.js # Test data script
│   ├── test-connection.js     # DB connection test
│   ├── package.json
│   └── .env                   # Environment variables
│
└── frontend/                   # React Frontend
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── home-dashboard/    # Doctor dashboard
    │   │   ├── Dashboard.jsx
    │   │   ├── Dashboard.css
    │   │   └── index.js
    │   ├── landing/           # Landing page
    │   │   ├── LandingPage.jsx
    │   │   └── LandingPage.css
    │   ├── auth/              # Authentication
    │   │   ├── AuthPage.jsx
    │   │   ├── AuthPage.css
    │   │   └── authApi.js
    │   ├── App.js             # Main app component
    │   ├── App.css
    │   └── index.js           # Entry point
    └── package.json
```

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### Doctor Login
```http
POST /doctors/login
Content-Type: application/json

{
  "phone": "1234567890",
  "password": "doctor123"
}

Response: 200 OK
{
  "doctorId": "D001",
  "name": "Dr. Smith",
  "phone": "1234567890",
  "specialization": "General Physician"
}
```

#### Doctor Registration
```http
POST /doctors/register
Content-Type: application/json

{
  "doctorId": "D001",
  "name": "Dr. Smith",
  "phone": "1234567890",
  "password": "doctor123",
  "specialization": "General Physician"
}

Response: 201 Created
```

### Patient Endpoints

#### Get All Patients
```http
GET /patients

Response: 200 OK
[
  {
    "patientId": "P001",
    "name": "John Doe",
    "phone": "9876543210",
    "age": 45,
    "gender": "Male",
    "registeredAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Patient by ID
```http
GET /patients/:patientId

Response: 200 OK
{
  "patientId": "P001",
  "name": "John Doe",
  "phone": "9876543210",
  "age": 45,
  "gender": "Male"
}
```

#### Register Patient
```http
POST /patients/register
Content-Type: application/json

{
  "patientId": "P001",
  "name": "John Doe",
  "phone": "9876543210",
  "password": "patient123",
  "age": 45,
  "gender": "Male"
}

Response: 201 Created
```

#### Patient Login
```http
POST /patients/login
Content-Type: application/json

{
  "phone": "9876543210",
  "password": "patient123"
}

Response: 200 OK
```

### Health Data Endpoints

#### Add Health Data
```http
POST /patients/:patientId/data
Content-Type: application/json

{
  "systolic": 120,
  "diastolic": 80,
  "heartRate": 72,
  "sugar": 95,
  "weight": 70,
  "notes": "Patient feeling well"
}

Response: 201 Created
```

#### Get Patient Health Data
```http
GET /patients/:patientId/data

Response: 200 OK
[
  {
    "date": "2024-01-15T10:30:00Z",
    "systolic": 120,
    "diastolic": 80,
    "heartRate": 72,
    "sugar": 95,
    "weight": 70,
    "notes": "Patient feeling well"
  }
]
```

### Notification Endpoints

#### Send Notification
```http
POST /patients/:patientId/notifications
Content-Type: application/json

{
  "title": "Appointment Reminder",
  "message": "Your checkup is scheduled for tomorrow at 10 AM"
}

Response: 201 Created
```

#### Get Patient Notifications
```http
GET /patients/:patientId/notifications

Response: 200 OK
[
  {
    "id": "notif_123",
    "title": "Appointment Reminder",
    "message": "Your checkup is scheduled for tomorrow",
    "createdAt": "2024-01-15T10:30:00Z",
    "readAt": null
  }
]
```

#### Mark Notification as Read
```http
PUT /patients/:patientId/notifications/:notificationId/read

Response: 200 OK
```

## Frontend Guide

### Pages

#### 1. Landing Page (`/`)
- ArogyaLink branding with logo
- "Your Health, Connected" tagline
- Sign In and Create Account buttons
- Gradient background design

#### 2. Authentication (`/auth`)
- Doctor login form
- Doctor registration form
- Phone number and password validation

#### 3. Doctor Dashboard (`/dashboard`)
- Patient list with search
- Add patient form
- Patient details view
- Health data entry
- Send notification feature
- Health trends chart

### Components

#### Dashboard Component
```jsx
import Dashboard from './home-dashboard/Dashboard';

// Features:
// - Patient management
// - Health data visualization
// - Notification system
// - Charts integration
```

#### Chart Configuration
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const getChartData = () => {
  // Returns last 10 health records
  // Formats data for recharts
};
```

### Styling

**Design System**
- Primary: `#00c9a7` (Teal)
- Secondary: `#7b2ff2` (Purple)
- Background: `#0a0a0f` (Dark)
- Card: `#1a1a2e`
- Text: `#ffffff`

**CSS Structure**
```css
/* Global styles in App.css */
/* Component-specific in [Component].css */
/* Responsive design with media queries */
```

## 🗄️ Backend Guide

### Database Models

#### Doctor Schema
```javascript
{
  doctorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: String,
  registeredAt: { type: Date, default: Date.now }
}
```

#### Patient Schema
```javascript
{
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  registeredAt: { type: Date, default: Date.now }
}
```

#### Health Data Schema
```javascript
{
  patientId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  systolic: Number,
  diastolic: Number,
  heartRate: Number,
  sugar: Number,
  weight: Number,
  notes: String
}
```

#### Notification Schema
```javascript
{
  patientId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  readAt: Date
}
```

### Running Test Scripts

**Create Test Patient**
```bash
node create-test-patient.js
```

**Test Database Connection**
```bash
node test-connection.js
```

### Error Handling

All API endpoints return consistent error responses:
```json
{
  "error": "Error message description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Testing

### Backend Testing
```bash
# Test database connection
node test-connection.js

# Create sample data
node create-test-patient.js

# Manual API testing with curl
curl http://localhost:4000/api/patients
```

### Frontend Testing
```bash
# Run tests
npm test

# Build for production
npm run build
```

## Deployment

### Backend Deployment

**Using PM2**
```bash
npm install -g pm2
pm2 start index.js --name arogyalink-api
pm2 save
pm2 startup
```

**Environment Variables**
```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
PORT=4000
```

### Frontend Deployment

**Build**
```bash
npm run build
```

**Deploy to Vercel/Netlify**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Security Best Practices

1. **Password Hashing** - Implement bcrypt for password encryption
2. **JWT Tokens** - Add JWT for session management
3. **Input Validation** - Validate all user inputs
4. **HTTPS** - Use SSL certificates in production
5. **Environment Variables** - Never commit .env files
6. **Rate Limiting** - Implement API rate limiting

## Performance Optimization

1. **Database Indexing**
```javascript
patientSchema.index({ patientId: 1 });
patientSchema.index({ phone: 1 });
```

2. **Caching** - Implement Redis for frequently accessed data
3. **Compression** - Use gzip compression
4. **CDN** - Serve static assets via CDN

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB service
sudo systemctl restart mongod
```

**Port Already in Use**
```bash
# Find process using port 4000
lsof -i :4000

# Kill process
kill -9 [PID]
```

**CORS Error**
- Ensure backend CORS is configured properly
- Check API_BASE_URL in frontend

## 📞 Support

For issues and questions:
- Backend: Check server logs in terminal
- Frontend: Check browser console
- Database: Check MongoDB logs

## 📄 License

Part of the ArogyaLink platform.

---

**Built with Node.js, Express, React, and MongoDB**
- Secure password hashing with bcryptjs
- CORS enabled for cross-origin requests

### Frontend
- Modern React.js with Create React App
- Beautiful landing page with animations
- Responsive design for all devices
- Smooth scroll effects and transitions
- God-level UI with gradient effects

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Test database connection:
```bash
npm run test
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📡 API Endpoints

### Doctor Management

- **POST** `/api/doctors` - Create new doctor account
- **POST** `/api/doctors/login` - Doctor login
- **GET** `/api/doctors` - Get all active doctors
- **GET** `/api/doctors/:id` - Get specific doctor
- **PUT** `/api/doctors/:id` - Update doctor info
- **DELETE** `/api/doctors/:id` - Soft delete doctor

## Frontend Features

- **Landing Page**: Eye-catching hero section with animated gradients
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Floating elements, parallax effects, and transitions
- **Modern UI**: Clean, professional design with glassmorphism effects
- **Performance Optimized**: Fast loading and smooth interactions

## 🔧 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- CORS
- dotenv

### Frontend
- React.js
- CSS3 with animations
- Modern ES6+ JavaScript
- Responsive design

## 📦 Production Deployment

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

## Development

### Backend
- Uses nodemon for auto-reload during development
- Environment variables for configuration
- MongoDB for data persistence

### Frontend
- Hot module replacement for instant updates
- Component-based architecture
- CSS modules for scoped styling

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/health-tracker
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## Team

Built with ❤️ by the SmartHealth team

---

For more information, visit our [documentation](https://docs.smarthealth.com) or contact support@smarthealth.com
