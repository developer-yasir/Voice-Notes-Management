# Voice Notes Pro

A modern, professional MERN stack application that allows users to create voice notes using speech recognition technology.

## Features

- **User Authentication**: JWT-based authentication with guest access
- **Voice Notes**: Create notes using voice-to-text conversion
- **Note Management**: Create, read, update, and delete notes
- **Categorization**: Organize notes by Work, Study, or Personal categories
- **Search & Filter**: Find notes by keywords or categories
- **Statistics Dashboard**: Visual overview of your notes
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Professional, clean interface with animations

## Tech Stack

### Frontend
- React (Vite)
- Custom CSS (No Tailwind)
- Axios
- react-speech-recognition

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

## Folder Structure

```
voice-notes-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── server.js
    └── ...
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend
- Vercel
- Netlify

### Backend
- Render
- Heroku

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/guest` - Login as guest

### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes for the logged-in user
- `GET /api/notes/search?query=keyword&category=category` - Search and filter notes
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Modern Features

### Enhanced UI/UX
- **Professional Design**: Modern color palette with indigo as primary color
- **Smooth Animations**: Subtle transitions and hover effects
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Visual Feedback**: Loading states, success/error indicators
- **Intuitive Navigation**: Clear breadcrumbs and navigation

### Voice Recording
- **Seamless Integration**: Speak or type in the same text area
- **Real-time Transcription**: See your words appear as you speak
- **Visual Indicators**: Clear recording status and feedback
- **Browser Compatibility**: Works with Chrome, Edge, and Safari

### Dashboard Features
- **Statistics Cards**: Overview of note counts by category
- **Advanced Filtering**: Category pills for quick filtering
- **Search Functionality**: Find notes by keywords
- **Note Previews**: Truncated content for quick scanning
- **Category Badges**: Visual category identification

### User Experience
- **Guest Access**: Try without creating an account
- **Form Validation**: Real-time input validation
- **Confirmation Dialogs**: Prevent accidental deletions
- **Error Handling**: Clear error messages and recovery
- **Loading States**: Visual feedback during operations

## Browser Support

For best results, use:
- Chrome (recommended)
- Edge
- Safari (limited support)

## Troubleshooting

### Voice Recording Issues
1. Visit `/speech-test` to test speech recognition
2. Check browser compatibility
3. Ensure microphone permissions are granted
4. Try refreshing the page

### Common Issues
- **CORS Errors**: Check backend configuration
- **MongoDB Connection**: Verify MONGO_URI in .env
- **JWT Issues**: Check JWT_SECRET in .env

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Contact

For support, please open an issue on the repository.# Voice-Notes-Management
