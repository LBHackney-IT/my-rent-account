import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import { redirectToHome, getSession } from "lib/session";

import { getAdminAuditRecords } from "lib/api/adminAuditRecords";
import AdminNavBar from "components/AdminNavBar/AdminNavBar";
import AdminAuditRecordsTable from "components/AdminAuditRecordsTable/AdminAuditRecordsTable";

export default function MyAccountPage({ adminDetails, adminAuditRecords }) {
  return (
    <div>
      <NextSeo title="Admin My Acount" noindex={true} />
      <AdminNavBar adminName={adminDetails.adminName} />
      <h1>My Account</h1>

      <AdminAuditRecordsTable adminAuditRecords={adminAuditRecords} />
    </div>
  );
}

MyAccountPage.propTypes = {
  adminDetails: PropTypes.object,
  ...AdminAuditRecordsTable.propTypes,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx, false);
  const adminDetails = account.adminDetails || {};
  const adminAuditRecords = await getAdminAuditRecords(adminDetails.adminEmail);

  if (!account || !account.adminDetails || !account.adminDetails.isAdmin) {
    redirectToHome(ctx);
  }

  return {
    props: {
      adminDetails: adminDetails,
      adminAuditRecords: adminAuditRecords,
    },
  };
};
