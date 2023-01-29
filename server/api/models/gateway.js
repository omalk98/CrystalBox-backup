import { Schema, model } from 'mongoose';

const GatewaySchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  location: { type: String, required: true },
  permissions: { type: [String], required: true }
});

const GatewayAccessSchema = new Schema({
  gateway: { type: String, required: true },
  key: { type: String, required: true },
  uuid: { type: String, required: true },
  access_date: { type: Date, required: true, default: new Date() }
});

const TagSchema = new Schema({
  _id: { type: String },
  uuid: { type: String, required: true },
  user_id: { type: String, required: true },
  date_created: { type: Date, required: true, default: new Date() }
});

const Gateway = model('Gateway', GatewaySchema);
const GatewayAccess = model('Gateway', GatewayAccessSchema);
const Tag = model('Tag', TagSchema);

export { Gateway, GatewayAccess, Tag };
