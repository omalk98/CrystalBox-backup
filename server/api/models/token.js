import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  id: { type: String, required: true },
  token: { type: String, unique: true, required: true },
  expires: { type: Date, required: true }
});

const Tokens = model('Tokens', TokenSchema);
export default Tokens;
