import axios from "axios";

const { AWS_ENDPOINT, AWS_SECRET } = process.env;

export const getTransactions = async ({ accountNumber, postcode }) => {
  const { data } = await axios.get(
    `${AWS_ENDPOINT}/transactions/payment-ref/${accountNumber}/post-code/${postcode}`,
    {
      headers: {
        "x-api-key": AWS_SECRET,
      },
    }
  );
  return data.transactions;
};
