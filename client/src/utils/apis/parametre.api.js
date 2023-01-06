import api from "./api";
export async function getParametreApi() {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .get("/api/parametre", { headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
export async function updateParametreApi(data) {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .put("/api/parametre", data, { headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
