import axios from "axios";

import { getNextMonday } from "utils/date";
import { toNormalised } from "postcode";

const {
  RENT_ACCOUNT_API_URL,
  API_KEY,
  SANDBOX_DOMAIN,
  SANDBOX_LINK_ACCOUNT,
} = process.env;

export const getAccount = async ({ accountNumber, postcode }) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/checkrentaccount/paymentref/${accountNumber}/postcode/${toNormalised(
      postcode
    )}`,
    {
      params: {},
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );

  return (
    data && {
      tagReference: data.exists,
    }
  );
};

export const getAccountDetails = async ({ accountNumber }, setPrivacy) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/paymentref/${accountNumber}/privacy/${setPrivacy}
  `,
    {
      params: {},
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  if (!data.accountNumber) {
    return null;
  }
  const currentBalance = data.currentBalance;
  const name = data.name;
  const toPay = data.toPay;
  return {
    accountNumber,
    name,
    currentBalance: parseFloat(
      currentBalance > 0 ? currentBalance : currentBalance * -1
    ).toFixed(2),
    rent: data.rent,
    toPay: (toPay < 0 ? 0 : toPay).toFixed(2),
    benefits: parseFloat(data.benefits).toFixed(2),
    hasArrears: data.hasArrears,
    isHackneyResponsible: data.isHackneyResponsible,
    nextPayment: getNextMonday(),
    postcode: data.postcode,
    tenancyAgreementId: data.tenancyAgreementId,
  };
};

export const getLinkedAccount = async ({ cssoId }) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/linkedaccount/${cssoId}`,
    {
      params: {},
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  return data;
};

export const linkAccount = async ({ accountNumber, cssoId }) => {
  const { data } = await axios.post(
    `${SANDBOX_DOMAIN}${SANDBOX_LINK_ACCOUNT}`,
    {
      accountNumber,
      cssoId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    }
  );
  return data;
};

export const unlinkAccount = async ({ linkId }) => {
  await axios.delete(`${RENT_ACCOUNT_API_URL}/linkedaccount/${linkId}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};
