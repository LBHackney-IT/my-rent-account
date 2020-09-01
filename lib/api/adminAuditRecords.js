import axios from "axios";

const { ADMIN_AUDIT_API_URL, ADMIN_AUDIT_API_KEY } = process.env;

export const getAdminAuditRecords = async (adminEmail) => {
  const { data } = await axios.get(
    `${ADMIN_AUDIT_API_URL}?useremail=${adminEmail}`,
    {
      headers: {
        "x-api-key": ADMIN_AUDIT_API_KEY,
      },
    }
  );

  return data.auditRecords;
};
