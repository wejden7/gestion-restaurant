import api from "./api";

export async function findEtablissementApi() {
  return new Promise((resolve, reject) => {
    api
      .get("/api/etablissement")
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function updateEtablissementApi(data) {
  return new Promise((resolve, reject) => {
    api
      .put("/api/etablissement", data)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
