import * as Yup from "yup";

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .min(9, "minimum 9 character")
    .max(9, "maximum 9 character")
    .required("Must entered phone")
    .trim(),
  password: Yup.string()
    .min(6, "minimum 9 character")
    .required("Must entered password")
    .trim(),
});
