import axios from "axios";

const { RENT_ACCOUNT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

export const getAllRentBreakdowns = async ({ tenancyAgreementId }) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/rentbreakdown/?tag-ref=${tenancyAgreementId}`,
    {
      headers: {
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );
  return data;
};
