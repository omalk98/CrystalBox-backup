import * as Yup from 'yup';
import Validation from '../../../../requests/field-validation';

export const UserSchema = Yup.object().shape({
  user_details: Yup.object({
    first_name: Validation.Name,
    last_name: Validation.Name,
    username: Validation.Username,
    email: Validation.Email
  }),
  personal_details: Yup.object({
    phone: Validation.Phone,
    address: Yup.object({
      street: Validation.Street,
      city: Validation.City,
      country: Validation.Country,
      postal_code: Validation.PostalCode
    })
  })
});

const UserModel = {
  user_details: {
    first_name: '',
    last_name: '',
    username: '',
    email: ''
  },
  personal_details: {
    date_of_birth: Date.now(),
    phone: '',
    address: {
      street: '',
      city: '',
      province: '',
      country: 'Canada',
      postal_code: ''
    }
  },
  server_details: {
    roles: [],
    status: {
      locked: false,
      activated: false
    }
  }
};

export default UserModel;
