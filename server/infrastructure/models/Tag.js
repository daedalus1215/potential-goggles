const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Tag = mongoose.model('tags', TagSchema);

module.exports = Tag;
