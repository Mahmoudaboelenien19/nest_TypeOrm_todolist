import Layout from "@/layout/Index";
import Home from "@/pages/home/Index";
import SignUp from "@/pages/signUp/Index";
import SignIn from "@/pages/signin/Index";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";
const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
          ],
        },

        {
          path: "",
          element: <UnprotectedRoutes />,
          children: [
            {
              path: "/signup",
              element: <SignUp />,
            },

            {
              path: "/signin",
              element: <SignIn />,
            },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} fallbackElement={<></>} />;
};

export default AppRoutes;
