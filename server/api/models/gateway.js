import { Schema, model } from 'mongoose';

const GatewaySchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  location: { type: String, required: true },
  permissions: { type: [String], required: true },
  date_created: { type: Date, required: true, default: Date.now() },
  access_count: { type: Number, required: true, default: 0 },
  last_access: { type: Date, required: true, default: Date.now() }
});

const GatewayAccessSchema = new Schema({
  gateway: { type: String, required: true },
  key: { type: String, required: true },
  uuid: { type: String, required: true, default: 'unknown' },
  user_id: { type: String, required: true, default: 'unknown' },
  access_date: { type: Date, required: true, default: Date.now() },
  code: { type: Number, required: true, default: 200 },
  description: { type: String, required: true, default: 'Access Granted' }
});

const TagSchema = new Schema({
  _id: { type: String },
  uuid: { type: String, unique: true, required: true },
  user_id: { type: String, required: true },
  date_created: { type: Date, required: true, default: Date.now() },
  access_count: { type: Number, required: true, default: 0 },
  last_access: { type: Date, required: true, default: Date.now() }
});

const Gateway = model('Gateway', GatewaySchema);
const GatewayAccess = model('Gateway_Access', GatewayAccessSchema);
const Tag = model('Tag', TagSchema);

export { Gateway, GatewayAccess, Tag };
