import * as Yup from 'yup';
import Validation from '../../requests/field-validation';

const UserPasswordSchema = Yup.object().shape({
  new_password: Validation.Password,
  confirm_new_password: Validation.ConfirmPassword
});

const UserDetailsSchema = Yup.object().shape({
  first_name: Validation.Name,
  last_name: Validation.Name,
  username: Validation.Username,
  email: Validation.Email
});

const PersonalDetailsSchema = Yup.object().shape({
  phone: Validation.Phone,
  address: Yup.object({
    street: Validation.Street,
    city: Validation.City,
    postal_code: Validation.PostalCode,
    country: Validation.Country
  })
});

const Schemas = {
  UserPasswordSchema,
  UserDetailsSchema,
  PersonalDetailsSchema
};

export default Schemas;
