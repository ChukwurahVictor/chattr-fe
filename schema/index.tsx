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
