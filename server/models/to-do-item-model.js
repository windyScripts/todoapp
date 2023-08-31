import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const toDoItemSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: { type: Date,
    default: Date.now },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('toDoItem', toDoItemSchema);
