import * as Yup from "yup";

export const EditProfileValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required("Must entered firstName").trim(),
  lastName: Yup.string().required("Must entered lastName").trim(),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(5, "Your password is too short."),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
