import * as yup from "yup";
export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "user name must be at least 6")
    .max(16, "user name must be less than 16")
    .required("username is required"),

  email: yup.string().email("add a valid email").required("email is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "use at  least 1 number , 1 special character and 1 letter"
    )
    .required("password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "doesn't match your password")
    .required("confirm your password"),
});
