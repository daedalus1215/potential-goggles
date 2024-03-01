import Mongoose from "mongoose";

const TagSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
});

const TagModel = Mongoose.model('tags', TagSchema);

export default TagModel;
