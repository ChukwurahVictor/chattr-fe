import * as yup from "yup";

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim()
    .required("Password is required!"),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  displayName: yup.string().required("Display name is required!"),
  email: yup
    .string()
    .trim()
    .email("Must be a valid email!")
    .required("Email is required!"),
  password: yup.string().trim().required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
