import api from "./api";

export async function createBrancheApi(data) {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .post("/api/branche", data)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function updateBrancheApi(data) {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .put("/api/branche/" + data._id, data, { headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function findBrancheApi() {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .get("/api/branche", { headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function deleteBrancheApi(id) {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .delete("/api/branche/" + id, { headers })
      .then((result) => resolve(id))
      .catch((error) => reject(error.response.data.errors));
  });
}
export async function openCloseZoneBrancheApi(id) {
  const token = localStorage.getItem("user-restauration-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    'Authorization': `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    api
      .put("/api/zone/" + id, {},{ headers })
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
