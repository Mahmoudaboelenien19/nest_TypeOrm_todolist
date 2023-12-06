import { Fragment } from "react";
import { useAppSelector } from "../shared/helpers/reduxTypes";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuth } = useAppSelector((st) => st.auth);
  return (
    <Fragment>{isAuth ? <Outlet /> : <Navigate to={"/signin"} />}</Fragment>
  );
};

export default ProtectedRoutes;
