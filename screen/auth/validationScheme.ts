import * as Yup from "yup";

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string()
    .min(6, "minimum 9 character")
    .required("Must entered password")
    .trim(),
});
