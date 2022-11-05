import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, default: 'Toronto' },
  date: { type: Date, default: Date.now },

  user_details: {
    first_name: {},
    last_name: 'Depp',
    username: 'Black-Pearl',
    email: 'johnny-pirate@email.com'
  },

  security_details: {
    id: 'pd4d3a5a-022c-4cfc-b7f0-9385751j751',
    security_level: '3'
  },

  personal_details: {
    date_of_birth: '1973-01-01',
    phone: '(123) 456-7890',
    address: {
      street: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postal_code: 'M4J 2J2',
      country: 'Canada'
    }
  },

  server_details: {
    roles: ['ADMIN'],
    status: { locked: false, activated: true },
    date_joined: '2022-02-15T15:26:54.699Z',
    time_last_login: '2022-10-26T07:55:20.630Z'
  },

  user_image: { type: String }
});

export default model('User', UserSchema);
