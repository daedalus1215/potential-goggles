const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default ProjectSchema;
