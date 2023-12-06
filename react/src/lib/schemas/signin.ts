import * as yup from "yup";
export const signInSchema = yup.object().shape({
  email: yup.string().email("add a valid email").required("email is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "use at  least 1 number , 1 special character and 1 letter"
    )
    .required("password is required"),
});
