import api from "./api";
import { checkMePresant } from "state/PresanceSlice";
export async function loginApi(user) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/login", user, headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
export async function loginEmployerApi(user, thunkAPI) {
  const { dispatch } = thunkAPI;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/login-employer", user, headers)
      .then((result) => {
        resolve(result.data);
        console.log(result.data.token);
        dispatch(checkMePresant(result.data.token));
      })
      .catch((error) => reject(error.response.data.errors));
  });
}
export async function loginTokenApi(thunkAPI) {
  const { dispatch } = thunkAPI;
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .get("/api/auth/loginToken", { headers })
      .then((result) => {
        resolve(result.data);
        dispatch(checkMePresant());
      })
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function registerApi(user) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/register", user, headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data));
  });
}

export async function forgotPasswordApi(email) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/forgotPassword", email, headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data));
  });
}

export async function verificationCodeApi(code) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/verificationCode", code, headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data));
  });
}

export async function updatePasswordCodeApi(password, token) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/updatePassword", password, { headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data));
  });
}
