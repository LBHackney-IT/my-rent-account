import axios from "axios";

export const getAccount = async (params) => {
  const { data } = await axios.get("/api/accounts", { params });
  return data;
};
