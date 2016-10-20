import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  // password: {
  //   type: String,
  //   required: true,
  //   set(password) {
  //     return password && password.length > 0 ? bcrypt.hashSync(password, 8) : null;
  //   },
  // },
});

// 
// userSchema.methods.isPasswordCorrect = function isPasswordCorrect(password) {
//   return bcrypt.compareSync(password, this.password);
// };

export default mongoose.model('User', userSchema);
