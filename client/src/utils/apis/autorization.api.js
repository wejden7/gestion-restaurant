import api from "./api";

export async function findAutorizationApi() {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };

  return new Promise((resolve, reject) => {
    api
      .get("/api/autorization",  {headers} )
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
