const express = require('express');
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  searchNotes
} = require('../controllers/noteController');

const router = express.Router();

router.route('/')
  .post(createNote)
  .get(getNotes);

router.route('/search')
  .get(searchNotes);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;