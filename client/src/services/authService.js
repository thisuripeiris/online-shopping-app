import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);
