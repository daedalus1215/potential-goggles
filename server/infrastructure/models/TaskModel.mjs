import Mongoose from "mongoose";

const TaskSchema = new Mongoose.Schema({
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
  time: [{
    date: { type: Date }, 
    time: { type: Number }, 
    unix: { type: Number }, 
    readableDate: { type: String }, 
    readableDateTime: { type: String } 
  }],
  tags: [],
});

const TaskModel = Mongoose.model('tasks', TaskSchema);

export default TaskModel;
