import axios from "axios";

const authService = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default authService;
