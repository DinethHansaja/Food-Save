import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5300/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;