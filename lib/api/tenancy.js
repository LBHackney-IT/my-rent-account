import axios from "axios";

const { SANDBOX_DOMAIN, SANDBOX_TENANCY_AGREEMENT } = process.env;

export const getAllRentBreakdowns = async ({ tenancyAgreementId }) => {
  const { data } = await axios.get(
    `${SANDBOX_DOMAIN}${SANDBOX_TENANCY_AGREEMENT}/GetAllRentBreakdowns/?tenancyAgreementId=${tenancyAgreementId}`
  );
  return data;
};
