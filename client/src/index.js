import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./index.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "pages";
const { Register, Login, ForgetPassword ,VerificationCode,UpdatePassword} = auth;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async (param) => {},
    errorElement: <div>error</div>,
    children: [],
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
    path:"forget-password",
    element:<ForgetPassword/>
  },
  {
    path:"verification-code",
    element:<VerificationCode/>,
  },{
    path:"update-password",
    element:<UpdatePassword/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
