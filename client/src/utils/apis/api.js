import axios from "axios";
const token = localStorage.getItem("user-restauration-token");
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
