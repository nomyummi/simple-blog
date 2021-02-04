import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    // TODO: Future feature - add admin privlieges (delete any post)
  }
);

export default mongoose.model('User', UserSchema);