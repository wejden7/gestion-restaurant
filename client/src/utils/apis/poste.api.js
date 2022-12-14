import api from "./api";

export async function findPosteApi() {
  return new Promise((resolve, reject) => {
    api
      .get("/api/post")
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function createPosteApi(data) {
  return new Promise((resolve, reject) => {
    api
      .post("/api/post", data)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function updatePosteApi(data) {
  return new Promise((resolve, reject) => {
    api
      .put("/api/post/"+data._id, data)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function deletePosteApi(id) {
  return new Promise((resolve, reject) => {
    api
      .delete("/api/post/"+id)
      .then((result) => resolve(id))
      .catch((error) => reject(error.response.data.errors));
  });
}

export async function findPermissionTagsApi(data) {
  return new Promise((resolve, reject) => {
    api
      .get("/api/permission")
      .then((result) => resolve(result.data.data))
      .catch((error) => reject(error.response.data.errors));
  });
}
