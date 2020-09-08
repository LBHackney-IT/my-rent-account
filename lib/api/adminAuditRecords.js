import axios from "axios";

const { ADMIN_AUDIT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

export const getAdminAuditRecords = async (adminEmail) => {
  const { data } = await axios.get(
    `${ADMIN_AUDIT_API_URL}?useremail=${adminEmail}`,
    {
      headers: {
        "x-api-key": RENT_ACCOUNT_API_KEY,
      },
    }
  );

  return data.auditRecords;
};
