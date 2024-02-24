import axios from "./axios";

export const registerRequest = async (user) => {
  const response = await axios.post("/register", user);
  return response;
};

export const loginRequest = async (user) => {
  const response = await axios.post("/login", user);
  return response;
};

export const verifyTokenRequest = async (token) => {
  const response = await axios.get("/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
