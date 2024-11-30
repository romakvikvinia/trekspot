import * as Yup from "yup";

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6, "minimum 9 character")
    .required("Must entered password")
    .trim(),
});

export const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6, "minimum 9 character")
    .required("Must entered password")
    .trim(),
  firstName: Yup.string().required("Must entered firstName").trim(),
  lastName: Yup.string().required("Must entered lastName").trim(),
});

export const creationTrip = Yup.object().shape({
  name: Yup.string(),
  range: Yup.object().required(),
  destination: Yup.object().required(),
  travelType: Yup.string(),
  cities: Yup.array().required(),
});
