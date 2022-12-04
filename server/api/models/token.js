import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  token: { type: String, unique: true, required: true, immutable: true },
  expires: {
    type: Date,
    required: true,
    immutable: true,
    expiresAfterSeconds: 0
  }
});

const AccessTokens = model('Access_Tokens', TokenSchema);
const RefreshTokens = model('Refresh_Tokens', TokenSchema);
const PasswordTokens = model('Password_Tokens', TokenSchema);

export { AccessTokens, RefreshTokens, PasswordTokens };
