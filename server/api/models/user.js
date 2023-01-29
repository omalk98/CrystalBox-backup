import { Schema, model } from 'mongoose';

const Address = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true }
});

const Status = new Schema({
  locked: { type: Boolean, required: true, default: false },
  activated: { type: Boolean, required: true, default: false }
});

const LastLogin = new Schema({
  time: { type: Date, required: true },
  ip: { type: String, required: true }
});

const UserSchema = new Schema({
  _id: { type: String },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  roles: { type: [String], required: true },
  date_joined: {
    type: Date,
    required: true,
    immutable: true,
    default: new Date()
  },
  last_login: { type: LastLogin, required: true, default: null },
  status: { type: Status, required: true }
});

const UserDetailsSchema = new Schema({
  _id: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone: { type: Number, unique: true, required: true },
  address: { type: Address, required: true },
  image: { type: String, required: true, default: null }
});

const Users = model('Users', UserSchema);
const UserDetails = model('User_Details', UserDetailsSchema);

export { Users, UserDetails };
