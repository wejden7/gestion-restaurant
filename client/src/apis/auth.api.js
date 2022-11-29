import api from "./api";

export async function loginApi(user) {
  return new Promise((resolve, reject) => {
    api
      .post("/login", user)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

export async function registerApi(user) {
  const headers = { 
    "Access-Control-Allow-Origin":"*",
    "Content-Type": "Application/json",
};
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/register", user,headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data));
  });
}
