import React from "react";
import PropTypes from "prop-types";
import { checkIsAdmin } from "lib/admin-session";
import { getProtocol } from "lib/urls";
import AdminLogin from "components/AdminLogin/AdminLogin";

export default function AdminLoginPage({ protocol, gssoUrl, returnUrl }) {
  return (
    <div>
      <h1>Login to My Rent Account</h1>

      <p className="govuk-body">
        This page is to log in to service team member accounts.
      </p>

      <p>Protocol: {protocol}</p>
      <p>GSSO Url: {gssoUrl}</p>

      <p>Return Url: {returnUrl}</p>

      <AdminLogin submitText="Login" gssoUrl={`${gssoUrl}${returnUrl}`} />

      <p className="govuk-body">
        Please contact your administrator if you have issues logging in.
      </p>
    </div>
  );
}

AdminLoginPage.propTypes = {
  protocol: PropTypes.string.isRequired,
  gssoUrl: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const { GSSO_URL } = process.env;
  const baseUrl = ctx.req.headers.host;
  const protocol = getProtocol();

  checkIsAdmin(ctx, false);

  return {
    props: {
      protocol: protocol,
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${baseUrl}/admin/login`,
    },
  };
};
