import axios from "axios";

const {
  RESIDENT_AUDIT_API_URL,
  ADMIN_AUDIT_API_URL,
  RENT_ACCOUNT_API_KEY,
} = process.env;

export const postAuditLogin = async ({ accountNumber, postcode, cssoId }) => {
  await axios.post(
    RESIDENT_AUDIT_API_URL,
    {
      RentAccountNumber: accountNumber,
      PostCode: postcode,
      LoggedIn: cssoId ? true : false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": RENT_ACCOUNT_API_KEY,
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
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );
};
