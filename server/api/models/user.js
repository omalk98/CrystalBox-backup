import { Schema, model } from 'mongoose';

const UserDetails = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true }
});

const SecurityDetails = new Schema({
  id: { type: String, required: true, unique: true },
  security_level: { type: Number, required: true }
});

const Status = new Schema({
  locked: { type: Boolean, required: true, default: false },
  activated: { type: Boolean, required: true, default: true }
});

const ServerDetails = new Schema({
  roles: { type: [String], required: true },
  status: { type: Status, required: true },
  date_joined: { type: Date, required: true, default: Date.now },
  time_last_login: { type: Date, required: true }
});

const Address = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true }
});

const PersonalDetails = new Schema({
  date_of_birth: { type: Date, required: true },
  phone: { type: Number, required: true },
  address: { type: Address, required: true }
});

const UserSchema = new Schema({
  user_details: { type: UserDetails, required: true },
  security_details: { type: SecurityDetails, required: true },
  personal_details: { type: PersonalDetails, required: true },
  server_details: { type: ServerDetails, required: true },
  user_image: { type: String }
});

export default model('User', UserSchema);
