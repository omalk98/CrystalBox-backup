import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  id: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true }
});

const AccessTokens = model('Access_Tokens', TokenSchema);
const RefreshTokens = model('Refresh_Tokens', TokenSchema);
export { AccessTokens, RefreshTokens };
