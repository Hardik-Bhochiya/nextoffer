import mongoose from 'mongoose';

/**
 * Note Schema
 * Represents an engineering study note, interview flashcard, or cheat sheet.
 * Indexed by `userId` for fast per-user filtering, with support for:
 * - Multi-tag array for instant search matching
 * - Importance ratings ('High', 'Medium', 'Low')
 * - Priority pinning (`pinned: true` floats to the top of note lists)
 * - Favorite bookmarking
 */
const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  topic: {
    type: String,
    trim: true,
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true
  }],
  importance: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
export default Note;

