import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now, required: true},
    text: {type: String, required: true},
  }
);

export default mongoose.model('Comment', CommentSchema);