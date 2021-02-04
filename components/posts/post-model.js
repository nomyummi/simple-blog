import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    postNumber: {type: Number, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  }
);

export default mongoose.model('Post', PostSchema);