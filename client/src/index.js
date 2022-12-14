import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./index.scss";
import App from "./App";
import { loginToken } from "state/AuthSlice";
import { findBranche, findEtablissement ,findPoste} from "state/SettingSlice";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

store.dispatch(loginToken());
store.dispatch(findBranche());
store.dispatch(findEtablissement());
store.dispatch(findPoste());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
