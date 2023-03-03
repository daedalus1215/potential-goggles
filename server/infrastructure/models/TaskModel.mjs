import  Mongoose  from "mongoose";

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
  time: [{ date: { type: Date }, time: { type: Number } }],
  tags: [],
});

const TaskModel = Mongoose.model('tasks', TaskSchema);

export default TaskModel;
