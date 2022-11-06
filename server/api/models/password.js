import { Schema, model } from 'mongoose';

const UserCredentialSchema = new Schema({
  hash: { type: String, required: true },
  id: { type: String, required: true, unique: true }
});

export default model('Passwords', UserCredentialSchema);
