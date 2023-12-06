import { IoNotifications } from "react-icons/io5";
import { RiFileList2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/helpers/reduxTypes";
import MainBtn from "../shared/MainBtn";
import axios from "axios";
import { backendRoute } from "@/lib/url";
import { logOutRedux } from "@/redux/authSlice";
const Nav = () => {
  const { name, isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = async () => {
    const res = await axios.get(backendRoute + "/users/logout", {
      withCredentials: true,
    });
    console.log(res);
    if (res.status === 200) {
      navigate("/signin");
      dispatch(logOutRedux());
    }
  };
  return (
    <nav className="h-12 bg-body text-white">
      <div className="max-w-[1250px]  h-full flex items-center p-4 justify-between mx-auto ">
        <Link to="/">
          <RiFileList2Fill size={25} />
        </Link>
        {isAuth ? (
          <div className="flex items-center gap-4">
            <IoNotifications />
            <span>{name}</span>
            <MainBtn
              btn="sign out"
              className="bg-mainRed text-white/70 rounded"
              onClick={logOut}
            />
          </div>
        ) : (
          <MainBtn
            className="bg-mainRed text-white/70 rounded"
            btn="sign in"
            onClick={() => navigate("/signin")}
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
