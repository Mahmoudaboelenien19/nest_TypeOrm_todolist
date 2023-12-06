import { Fragment } from "react";
import { useAppSelector } from "../shared/helpers/reduxTypes";
import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoutes = () => {
  const { isAuth } = useAppSelector((st) => st.auth);
  //this to disable user visting  signin && signUp if   if authenticated
  return <Fragment>{!isAuth ? <Outlet /> : <Navigate to={"/"} />}</Fragment>;
};

export default UnprotectedRoutes;
