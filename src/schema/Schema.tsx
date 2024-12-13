import * as yup from "yup";

const passwordRule = /^(?=.*[a-z])(?=.*\d)(?=.*[-.+@_&])(?=.*[A-Z]*).{6,}$/;
const nameRule = /[\w\s@]+$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("email is required"),

  password: yup
    .string()
    .matches(passwordRule, {
      message:
        "Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ",
    })
    .required("password is required"),
});

export const orderSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(nameRule, {
      message: "only allow letters, number, and underscore",
    })
    .required("firstname is required"),
  lastname: yup
    .string()
    .matches(nameRule, {
      message: "only allow letters, number, and underscore",
    })
    .required("lastname is required"),
  email: yup.string().email("Enter a valid email address").required("email is required"),
  address_line_one: yup.string().required("address is required"),
  country: yup.string().required("street address is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  zipcode: yup.number().required("zipcode is required"),
  phone: yup.string().required("phone is required"),
});

export const updateOrderSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(nameRule, {
      message: "only allow letters, number, and underscore",
    })
    .optional(),

  lastname: yup
    .string()
    .matches(nameRule, {
      message: "only allow letters, number, and underscore",
    })
    .optional(),

  email: yup.string().email({ message: "Enter a valid email address" }).optional(),

  address_line_one: yup.string().optional(),
  country: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipcode: yup.number().optional(),
  phone: yup.string().optional(),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(nameRule, {
      message: "only allow letters, number, and underscore",
    })
    .required("username is required"),
  email: yup.string().email("Invalid email address").required("email is required"),
  password: yup
    .string()
    .matches(passwordRule, {
      message:
        "Password must be at least 8 digits characters long and contain at least one letter, digit and special characters ",
    })
    .required("password is required"),
});

export const forgotSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("email is required"),
});
