import axios from "axios";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { backendRoute } from "./lib/url";
import { useAppDispatch } from "./components/shared/helpers/reduxTypes";
import { setAuth, setName, setUserId } from "./redux/authSlice";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const checkToken = async () => {
    const res = await axios.get(backendRoute + "/users/cookie", {
      withCredentials: true,
    });
    if (res.data) {
      const { id, name } = res.data;
      dispatch(setAuth(true));
      dispatch(setUserId(id));
      dispatch(setName(name));
    }
  };
  const initialialRender = useRef(true);
  useEffect(() => {
    if (initialialRender.current) {
      checkToken();
      initialialRender.current = false;
    }
  }, []);
  return <main>{children}</main>;
};

export default AuthWrapper;
