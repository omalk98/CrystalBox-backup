import * as Yup from 'yup';

const maxLenErr = (field, max) =>
  `${field} must be less than ${max} characters`;
const minLenErr = (field, min) => `${field} must be at least ${min} characters`;
const requiredErr = (field) => `${field} is required`;
const oneOfErr = (field, type) => `${field} must contain at least 1 ${type}`;

const namePattern = /^[a-zA-Z,'"-.]+$/;
const passwordPattern = {
  lowerCase: /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{1,}/,
  upperCase: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{1,}/,
  number: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{1,}/,
  symbol:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}/
};
const streetPattern = /^(\d{1,})+$/;
const postalCodePattern = /^(\s?)+[a-zA-Z]\d[a-zA-Z](\s?)+\d[a-zA-Z]\d(\s?)+$/;

const Validation = {
  Name: Yup.string()
    .matches(namePattern, 'Name must contain only letters or punctuation')
    .max(50, maxLenErr('Name', 50))
    .required(requiredErr('Name')),
  Email: Yup.string().email('Invalid email').required(requiredErr('Email')),
  Password: Yup.string()
    .matches(
      passwordPattern.lowerCase,
      oneOfErr('Password', 'lowercase letter')
    )
    .matches(
      passwordPattern.upperCase,
      oneOfErr('Password', 'uppercase letter')
    )
    .matches(passwordPattern.number, oneOfErr('Password', 'number'))
    .matches(passwordPattern.symbol, oneOfErr('Password', 'symbol'))
    .min(8, minLenErr('Password', 8))
    .max(50, maxLenErr('Password', 50))
    .required('Password is required'),
  ConfirmPassword: Yup.string().oneOf(
    [Yup.ref('new_password'), null],
    'Passwords must match'
  ),
  Username: Yup.string()
    .min(6, minLenErr('Username', 6))
    .max(50, maxLenErr('Username', 50)),
  Phone: Yup.string()
    .min(10, 'Must be 10 numbers')
    .max(10, 'Must be 10 numbers'),
  Street: Yup.string()
    .matches(streetPattern, oneOfErr('Street', 'number'))
    .max(100, maxLenErr('Street', 100)),
  City: Yup.string().max(100, maxLenErr('City', 100)),
  PostalCode: Yup.string()
    .matches(postalCodePattern, 'Invalid postal code')
    .min(6, 'Invalid postal code')
    .max(6, 'Invalid postal code'),
  Country: Yup.string().max(100, maxLenErr('Country', 100))
};

export default Validation;
