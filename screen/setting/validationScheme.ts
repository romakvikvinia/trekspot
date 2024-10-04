import * as Yup from "yup";

export const EditProfileValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required("Must entered firstName").trim(),
  lastName: Yup.string().required("Must entered lastName").trim(),
});
