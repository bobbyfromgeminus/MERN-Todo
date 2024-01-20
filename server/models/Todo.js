import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    comment: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;