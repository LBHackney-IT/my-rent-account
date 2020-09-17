import axios from "axios";

import { getNextMonday } from "utils/date";
import { toNormalised } from "postcode";

const { RENT_ACCOUNT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

export const getAccount = async ({ accountNumber, postcode }) => {
  const { data } = await axios.get(
    `${RENT_ACCOUNT_API_URL}/checkrentaccount/paymentref/${accountNumber}/postcode/${toNormalised(
      postcode
    )}`,
    {
      headers: {
        "x-api-key": RENT_ACCOUNT_API_KEY,
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
    `${RENT_ACCOUNT_API_URL}/paymentref/${accountNumber}/privacy/${setPrivacy}`,
    {
      headers: {
        "x-api-key": RENT_ACCOUNT_API_KEY,
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
    ),
    rent: data.rent,
    toPay: toPay < 0 ? 0 : toPay,
    benefits: parseFloat(data.benefits),
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
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );
  return data;
};

export const linkAccount = async ({ accountNumber, cssoId }) => {
  const { data } = await axios.post(
    `${RENT_ACCOUNT_API_URL}/linkedaccount/`,
    {
      rentAccountNumber: accountNumber,
      cssoId: cssoId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );
  return data;
};

export const unlinkAccount = async ({ linkId }) => {
  await axios.delete(`${RENT_ACCOUNT_API_URL}/linkedaccount/${linkId}`, {
    headers: {
      "x-api-key": RENT_ACCOUNT_API_KEY,
    },
  });
};
