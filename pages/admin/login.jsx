import React from "react";
import PropTypes from "prop-types";
import { checkIsAdmin } from "lib/admin-session";

import AdminLogin from "components/AdminLogin/AdminLogin";

export default function AdminLoginPage({ gssoUrl, returnUrl }) {
  return (
    <div>
      <h1>Login to My Rent Account</h1>
      <p className="govuk-body">
        This page is to log in to service team member accounts.
      </p>

      <AdminLogin submitText="Login" gssoUrl={`${gssoUrl}${returnUrl}`} />

      <p className="govuk-body">
        Please contact your administrator if you have issues logging in.
      </p>
    </div>
  );
}

AdminLoginPage.propTypes = {
  gssoUrl: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const { GSSO_URL } = process.env;
  const host = ctx.req.headers.host;
  const account = checkIsAdmin(ctx, false);

  if (account && account.isAdmin) {
    ctx.res.writeHead(302, {
      Location: "/admin",
    });
    ctx.res.end();
  }

  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${host}/admin`,
    },
  };
};
