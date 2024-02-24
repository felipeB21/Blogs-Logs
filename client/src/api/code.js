import axios from "./axios";

export const codePostRequest = async (code) => {
  const response = await axios.post("/code", code);
  return response;
};
export const codeGetRequestById = async (id) => {
  const response = await axios.get(`/code/${id}`);
  return response;
};

export const codeGetRequest = async () => {
  const response = await axios.get("/code");
  return response;
};
