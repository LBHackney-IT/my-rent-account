import axios from "axios";

const { CRM_AUTH_URL, CRM_AUTH_TOKEN } = process.env;
const headers = {
  Authorization: CRM_AUTH_TOKEN,
};

export const getAuthToken = async () => {
  const { data } = await axios.get(CRM_AUTH_URL, { headers });
  return data;
};
