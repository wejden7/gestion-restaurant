import { createBrowserRouter } from "react-router-dom";
import { auth, landing } from "pages";

const { Register, Login, ForgetPassword, VerificationCode, UpdatePassword } =
  auth;
const { Layout, Accueil } = landing;
export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async (param) => {},
    errorElement: <div>error</div>,
    children: [
      { path:"/",
        element: <Accueil />,
      },
    ],
  },

  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "verification-code",
    element: <VerificationCode />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
]);
