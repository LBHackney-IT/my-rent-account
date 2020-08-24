import React from "react";
import PropTypes from "prop-types";
import { getProtocol } from "lib/urls";
import { checkGSSO, redirectToAdminHome } from "lib/admin-session";
import AdminLogin from "components/AdminLogin/AdminLogin";

export default function AdminLoginPage({ req, protocol, gssoUrl, returnUrl }) {
  console.log(`
  Protocol: ${protocol}
  GSSO Url: ${gssoUrl}
  Return Url: ${returnUrl}

  `);

  console.log(req);

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
  protocol: PropTypes.string.isRequired,
  gssoUrl: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const { GSSO_URL } = process.env;
  const baseUrl = ctx.req.headers.host;
  const protocol = getProtocol();

  const account = checkGSSO(ctx);

  if (account && account.isAdmin) {
    redirectToAdminHome(ctx);
  }

  return {
    props: {
      req: JSON.stringify(ctx.req.headers),
      protocol: protocol,
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${baseUrl}/admin/login`,
    },
  };
};
