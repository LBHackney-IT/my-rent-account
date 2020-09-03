import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import { redirectToHome, checkAdminGSSO } from "lib/session";
import { getProtocol } from "lib/urls";
import AdminLogin from "components/AdminLogin/AdminLogin";

export default function AdminLoginPage({ gssoUrl, returnUrl }) {
  return (
    <div>
      <NextSeo title="Admin Log In" noindex={true} />
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
  const protocol = getProtocol();

  const account = checkAdminGSSO(ctx);

  if (account && account.adminDetails && account.adminDetails.isAdmin) {
    redirectToHome(ctx);
  }

  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${URL_PREFIX}/admin`,
    },
  };
};
