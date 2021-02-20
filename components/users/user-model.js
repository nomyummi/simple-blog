import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    hash: {type: String, required: true}, 
    salt: {type: String, required: true}
  }
);

export default mongoose.model('User', UserSchema);