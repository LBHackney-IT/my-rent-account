import axios from "axios";

import { getAuthToken } from "lib/api/auth";

const { API_URL, ADMIN_AUDIT_API_URL, ADMIN_AUDIT_API_KEY } = process.env;

export const postAuditLogin = async ({
  accountNumber,
  postcode,
  tagReference,
}) => {
  const auth = await getAuthToken();
  await axios.post(
    `${API_URL}/hackney_housingaccountaudits( )`,
    {
      hackney_accountnumber: accountNumber,
      hackney_accounttype: "1",
      hackney_name: "Rent Account Audit History",
      hackney_postcode: postcode,
      hackney_tagreferencenumber: tagReference,
    },
    {
      params: {
        $select:
          "hackney_accountnumber,hackney_accounttype,hackney_name,hackney_postcod e,hackney_tagreferencenumber",
      },
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    }
  );
};

export const postAdminAudit = async ({
  user,
  accountNumber,
  cssoLogin,
  auditAction,
}) => {
  await axios.post(
    ADMIN_AUDIT_API_URL,
    {
      User: user,
      RentAccountNumber: accountNumber,
      CSSOLogin: cssoLogin,
      AuditAction: auditAction,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ADMIN_AUDIT_API_KEY,
      },
    }
  );
};
