import * as yup from 'yup'

const passwordRule = /(?=.*\d)[a-zA-Z\d]{8,}$/
const nameRule = /^(?=.*[_@])[\w\s@]+$/

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(nameRule, {
      message: 'only allow letters, number, and underscore',
    })
    .required('first name is required'),

  lastname: yup
    .string()
    .matches(nameRule, {
      message: 'only allow letters, number, and underscore',
    })
    .required('last name is required'),

  firstname: yup
    .string()
    .matches(nameRule, {
      message: 'only allow letters, number, and underscore',
    })
    .required('first name is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('email is required'),

  password: yup
    .string()
    .matches(passwordRule, {
      message:
        'Password must be at least 8 digits characters long and contain at least one letter, digit and special characters ',
    })
    .required('password is required'),
})

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .matches(nameRule, {
      message: 'username should start with @ or an underscore ',
    })
    .required('username is required'),

  password: yup
    .string()
    .matches(passwordRule, {
      message:
        'Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ',
    })
    .required('password is required'),
})

export const orderSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(nameRule, {
      message: 'only allow letters, number, and underscore',
    })
    .required('firstname is required'),
  lastname: yup
    .string()
    .matches(nameRule, {
      message: 'only allow letters, number, and underscore',
    })
    .required('lastname is required'),
  streetAddress: yup.string().required('street address is required'),
  country: yup.string().required('street address is required'),
  city: yup.string().required('city is required'),
  zipcode: yup.number().required('zipcode is required'),
  phone: yup.string().required('zipcode is required'),
})
