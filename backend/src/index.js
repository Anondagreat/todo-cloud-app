const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/todo')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// Models
const Todo = mongoose.model('Todo', {
  title: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', {
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

// Routes Todo
app.get('/todos', async (req, res) => res.json(await Todo.find().sort({createdAt: -1})));
app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});
app.patch('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(todo);
});
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
});

// Routes Note
app.get('/notes', async (req, res) => res.json(await Note.find().sort({createdAt: -1})));
app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});
app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));