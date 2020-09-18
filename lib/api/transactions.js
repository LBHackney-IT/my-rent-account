import axios from "axios";

const { RENT_ACCOUNT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

export const getTransactions = async ({ accountNumber, postcode }) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/transactions/payment-ref/${accountNumber}/post-code/${postcode}`,
    {
      headers: {
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );
  return data.transactions;
};
