import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

export const signUpInputs = [
  {
    Icon: HiOutlineUser,
    placeholder: "Username",
    name: "name",
    type: "text",
  },
  {
    Icon: HiAtSymbol,

    placeholder: "Email",
    name: "email",
    type: "email",
  },

  {
    Icon: HiFingerPrint,

    placeholder: "Password",
    name: "password",
    type: "password",
  },
  {
    Icon: HiFingerPrint,

    placeholder: "Confirm",
    name: "confirm",
    type: "password",
  },
];
