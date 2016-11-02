/**
 * @flow
 */
import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
