import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import VoiceRecorder from '../components/VoiceRecorder';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
      fetchNotes();
    }
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (filterCategory) params.category = filterCategory;
      
      const res = await axios.get('/notes/search', { params });
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [searchQuery, filterCategory, user]);

  // Calculate stats
  const stats = {
    total: notes.length,
    work: notes.filter(note => note.category === 'Work').length,
    study: notes.filter(note => note.category === 'Study').length,
    personal: notes.filter(note => note.category === 'Personal').length
  };

  const handleTranscriptChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      if (editingNote) {
        // Update note
        const res = await axios.put(`/notes/${editingNote._id}`, {
          title,
          content,
          category
        });
        setNotes(notes.map(note => note._id === editingNote._id ? res.data : note));
      } else {
        // Create new note
        const res = await axios.post('/notes', {
          title,
          content,
          category
        });
        setNotes([res.data, ...notes]);
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setCategory('Personal');
      setShowNoteForm(false);
      setEditingNote(null);
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save note: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setShowNoteForm(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setCategory('Personal');
    setError('');
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setCategory('Personal');
    setShowNoteForm(true);
    setError('');
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilterCategory('');
    } else {
      setFilterCategory(category);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Navbar user={user} />
        <div className="container mt-6 text-center">
          <div className="loading-spinner loading-spinner-dark"></div>
          <p className="mt-4 text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Navbar user={user} />
      
      <div className="container mt-6">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">My Notes</h1>
            <p className="dashboard-subtitle">Create and manage your voice notes</p>
          </div>
          <button
            onClick={handleNewNote}
            className="add-note-button button-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Note
          </button>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.work}</div>
            <div className="stat-label">Work Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.study}</div>
            <div className="stat-label">Study Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.personal}</div>
            <div className="stat-label">Personal Notes</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search notes by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <div className="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by Category:
            </div>
            <div className="filter-options">
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setSelectedCategory(e.target.value || 'All');
                }}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter">
          <div 
            className={`category-pill ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('All')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            All Notes
          </div>
          <div 
            className={`category-pill ${selectedCategory === 'Work' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('Work')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Work
          </div>
          <div 
            className={`category-pill ${selectedCategory === 'Study' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('Study')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Study
          </div>
          <div 
            className={`category-pill ${selectedCategory === 'Personal' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('Personal')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>{error}</div>
          </div>
        )}

        {/* Note Form Modal */}
        {showNoteForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="modal-close-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="modal-form-group">
                    <label htmlFor="title" className="modal-form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="modal-form-input"
                      placeholder="Enter note title"
                    />
                  </div>
                  
                  <div className="modal-form-group">
                    <label className="modal-form-label">
                      Category
                    </label>
                    <div className="category-options">
                      {['Work', 'Study', 'Personal'].map((cat) => (
                        <div 
                          key={cat} 
                          className={`category-option ${category === cat ? 'active' : ''}`}
                          onClick={() => setCategory(cat)}
                        >
                          <input
                            id={`category-${cat}`}
                            name="category"
                            type="radio"
                            value={cat}
                            checked={category === cat}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-checkbox"
                          />
                          <label htmlFor={`category-${cat}`}>
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-form-group">
                    <label className="modal-form-label">
                      Content (Voice or Text)
                    </label>
                    <VoiceRecorder 
                      onTranscriptChange={handleTranscriptChange} 
                      content={content}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tip: Click "Start Recording" and speak, or type directly in the text area above.
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="modal-button modal-button-secondary"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="modal-button modal-button-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      editingNote ? 'Update Note' : 'Create Note'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="empty-state-title">No notes yet</h3>
            <p className="empty-state-description">
              {searchQuery || filterCategory 
                ? 'No notes match your search criteria. Try adjusting your filters.' 
                : 'Get started by creating your first note. Click the button above to begin.'}
            </p>
            <button
              onClick={handleNewNote}
              className="add-note-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;