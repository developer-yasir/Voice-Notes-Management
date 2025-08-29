# Voice Notes App - Summary

This is a complete MERN stack application that allows users to create voice notes using speech recognition technology.

## Features Implemented

1. **User Authentication**
   - JWT-based authentication
   - User registration with name, email, and password
   - Password hashing with bcrypt
   - Protected routes middleware

2. **Voice Notes Functionality**
   - Speech recognition using Web Speech API (react-speech-recognition)
   - Voice-to-text conversion
   - Note creation with title, content, and category
   - CRUD operations for notes
   - Search and filter by keyword and category

3. **Frontend (React + Vite)**
   - Responsive design with TailwindCSS
   - React Router for navigation
   - Component-based architecture
   - Axios for API requests
   - Voice recorder component
   - Note card component
   - Dashboard with search/filter

4. **Backend (Node.js + Express)**
   - RESTful API design
   - MongoDB with Mongoose
   - Environment variable configuration
   - Error handling
   - Modular structure (controllers, routes, middleware)

## Folder Structure

```
voice-notes-app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Login, Signup, Dashboard
│   │   ├── api/            # Axios instance
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── ...
└── backend/
    ├── models/             # User, Note schemas
    ├── routes/             # authRoutes, noteRoutes
    ├── controllers/        # authController, noteController
    ├── middleware/         # authMiddleware
    ├── server.js           # Entry point
    └── ...
```

## How to Run

1. **Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with MONGO_URI and JWT_SECRET
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Technologies Used

- **Frontend**: React, Vite, TailwindCSS, Axios, react-speech-recognition
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Deployment**: Ready for deployment on Vercel/Netlify (frontend) and Render/Heroku (backend)

## Key Components

1. **VoiceRecorder Component**: Handles speech recognition and converts voice to text
2. **NoteCard Component**: Displays individual notes with category tags
3. **Dashboard Page**: Main interface for viewing, creating, and managing notes
4. **Authentication Middleware**: Protects API routes
5. **Search/Filter Functionality**: Allows users to find notes by keyword or category

The app is production-ready with a clean, modular structure and follows best practices for both frontend and backend development.