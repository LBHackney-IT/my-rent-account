import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import { getSession, updateSession } from "lib/session";

import AdminNavBar from "components/AdminNavBar/AdminNavBar";
import AccountLogin from "components/AccountLogin/AccountLogin";

const { CSSO_DOMAIN, CSSO_ID, CSSO_SECRET, URL_PREFIX } = process.env;

export default function Home({ adminDetails, loginUrl, registerUrl }) {
  return (
    <div>
      <NextSeo title="Home" />
      {adminDetails.isAdmin && (
        <AdminNavBar adminName={adminDetails.adminName} />
      )}
      <h1>My rent account</h1>
      <p className="govuk-body">
        To view your rent account balance and make a payment, please enter your
        rent account number and post code in the boxes below.
      </p>
      <AccountLogin
        adminDetails={adminDetails}
        onSubmit={updateSession}
        submitText="View account"
      />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <h2>Login to One Account</h2>
      <p className="govuk-body">
        If you would like to view your rent statements and see how your rent is
        calculated, you’ll need to log into One Account.
      </p>
      <a className="govuk-button" href={loginUrl}>
        Login
      </a>
      <div className="govuk-body">
        If you haven&apos;t already registered you can{" "}
        <a className="govuk-link" href={registerUrl}>
          create an account
        </a>
        .
      </div>
      <div className="govuk-body">
        Problems signing in?{" "}
        <a
          className="govuk-link"
          href="https://hackney.gov.uk/rent-account-help"
        >
          Visit our help section
        </a>
      </div>
    </div>
  );
}

Home.propTypes = {
  adminDetails: PropTypes.object,
  registerUrl: PropTypes.string.isRequired,
  loginUrl: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx, false);
  const adminDetails = account.adminDetails || {};
  const isAdmin = Boolean(adminDetails && adminDetails.isAdmin);

  if (account && !isAdmin) {
    ctx.res.writeHead(302, {
      Location: account.accountNumber || isAdmin ? "/account" : "/link-account",
    });
    ctx.res.end();
  }
  const queryString = `?grant_type=authorization_code&client_id=${CSSO_ID}&client_secret=${CSSO_SECRET}&scope=openid%20email&response_type=code&redirect_uri=https://${URL_PREFIX}/auth`;
  return {
    props: {
      adminDetails: adminDetails,
      registerUrl: `${CSSO_DOMAIN}/users/sign_up${queryString}`,
      loginUrl: `${CSSO_DOMAIN}/oauth/authorize${queryString}`,
    },
  };
};
