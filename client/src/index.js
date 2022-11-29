import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "pages";
const {Register,Login,Auth}= auth
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
   
  
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
