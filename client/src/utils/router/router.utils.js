import { createBrowserRouter } from "react-router-dom";
import { auth, landing } from "pages";
import { AuthLayout, LandingLayout } from "layouts";

export default createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    loader: async (param) => {},
    errorElement: <div>error</div>,
    children: [{ path: "/", element: <landing.Accueil /> }],
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
