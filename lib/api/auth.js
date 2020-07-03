import axios from "axios";

const { AUTH_URL, AUTH_TOKEN } = process.env;
const headers = {
  Authorization: AUTH_TOKEN,
};

export const getAuthToken = async () => {
  const { data } = await axios.get(AUTH_URL, { headers });
  return data;
};
