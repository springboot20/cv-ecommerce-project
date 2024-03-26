import * as yup from 'yup';

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const nameRule = /^[\w\s@]+$/;
// const emailRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const username_or_email =
  /^(?=.*[a-zA-Z0-9._-])([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}|[a-zA-Z0-9._-]+)$/;

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(nameRule, { message: 'only allow letters, number, and underscore' })
    .required('first name is required'),
  email: yup.string().email('Invalid email address').required('email is required'),
  password: yup
    .string()
    .matches(passwordRule, {
      message:
        'Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ',
    })
    .required('password is required'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(username_or_email, { message: 'Enter a valid email' })
    .required('email is required'),
  password: yup
    .string()
    .matches(passwordRule, {
      message:
        'Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ',
    })
    .required('password is required'),
});

export const orderSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(nameRule, { message: 'only allow letters, number, and underscore' })
    .required('firstname is required'),
  lastname: yup
    .string()
    .matches(nameRule, { message: 'only allow letters, number, and underscore' })
    .required('lastname is required'),
  streetAddress: yup.string().required('street address is required'),
  country: yup.string().required('street address is required'),
  city: yup.string().required('city is required'),
  zipcode: yup.number().required('zipcode is required'),
  phone: yup.string().required('zipcode is required'),
});
