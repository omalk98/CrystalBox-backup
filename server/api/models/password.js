import { Schema, model } from 'mongoose';

const PasswordSchema = new Schema({
  _id: { type: String },
  hash: { type: String, required: true }
});

export default model('Passwords', PasswordSchema);
