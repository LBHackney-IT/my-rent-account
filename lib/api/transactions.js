import axios from "axios";

const { TRANSACTIONS_API_URL, TRANSACTIONS_API_KEY } = process.env;

export const getTransactions = async ({ accountNumber, postcode }) => {
  const { data } = await axios.get(
    `${TRANSACTIONS_API_URL}/transactions/payment-ref/${accountNumber}/post-code/${postcode}`,
    {
      headers: {
        "x-api-key": TRANSACTIONS_API_KEY,
      },
    }
  );
  return data.transactions;
};
