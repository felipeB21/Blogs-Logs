import axios from "axios";

export const registerRequest = async (user) => {
  const response = await axios.post("http://localhost:3030/api/register", user);
  return response;
};

export const loginRequest = async (user) => {
  const response = await axios.post("http://localhost:3030/api/login", user);
  return response;
};
