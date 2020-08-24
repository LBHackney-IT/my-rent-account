import React from "react";
import PropTypes from "prop-types";
import { checkGSSO, redirectToAdminHome } from "lib/admin-session";
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
  const { GSSO_URL, URL_PREFIX } = process.env;

  const account = checkGSSO(ctx);

  if (account && account.isAdmin) {
    redirectToAdminHome(ctx);
  }

  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${URL_PREFIX}/admin/login`,
    },
  };
};
