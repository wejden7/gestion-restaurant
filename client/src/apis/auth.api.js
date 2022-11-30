import api from "./api";

export async function loginApi(user) {
  const headers = { 
    "Access-Control-Allow-Origin":"*",
    "Content-Type": "Application/json",
};
  return new Promise((resolve, reject) => {
    api
      .post("/api/auth/login", user,headers)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
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
