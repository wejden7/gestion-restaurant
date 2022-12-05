import { createBrowserRouter } from "react-router-dom";
import { auth, landing, error } from "pages";
import { AuthLayout, LandingLayout, DashboardLayout } from "layouts";

export default createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    loader: async (param) => {},
    errorElement: <error.NotFound />,
    children: [{ path: "/", element: <landing.Accueil /> }],
  },
  {
    path: "/404",
    element: <error.NotFound />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div className="content-dashboard">wejden</div>,
      },
    ],
  },
  {
    path: "/user",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <auth.Register />,
      },
      {
        path: "login",
        element: <auth.Login />,
      },
      {
        path: "forget-password",
        element: <auth.ForgetPassword />,
      },
      {
        path: "verification-code",
        element: <auth.VerificationCode />,
      },
      {
        path: "update-password",
        element: <auth.UpdatePassword />,
      },
    ],
  },
]);
