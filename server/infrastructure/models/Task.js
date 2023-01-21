const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  contractId: {
    type: Number,
  },
  time: [{ date: { type: Date }, time: { type: Number } }],
  tags: [],
});

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;
