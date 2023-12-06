import * as yup from "yup";
export const taskSchena = yup.object().shape({
  title: yup
    .string()
    .min(8, "use at least 8 letters")
    .max(14, "use at most 14 letters")
    .required("title is required"),
  category: yup.string().required("add a category"),
  description: yup
    .string()
    .min(25, "use at least 25 letters")
    .max(150, "use at most 150 letters")
    .required("title is required"),
  finishedAt: yup.string().required("add when this task shoud be done"),
});
