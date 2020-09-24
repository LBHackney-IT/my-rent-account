import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";

import { getSession } from "lib/session";
import AdminNavBar from "components/AdminNavBar/AdminNavBar";

const ErrorPage = ({ isAdmin }) => {
  return (
    <div className="govuk-body">
      <NextSeo
        title="Sorry, there is a problem with the service"
        noindex={true}
      />
      {isAdmin && <AdminNavBar />}
      <h1 className="govuk-heading-l">
        Sorry, there is a problem with the service
      </h1>

      <p className="govuk-body">Try again later.</p>
      <p className="govuk-body">
        If you need to manage your account urgently, call us on 020 8356 3100.
        We&apos;re open Monday to Friday, 9am to 5pm.
      </p>
      <p className="govuk-body">
        You can make a payment at any time by calling 020 8356 5050. Please have
        your payment reference to hand.
      </p>
    </div>
  );
};

ErrorPage.propTypes = {
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx, false);
  const adminDetails = (account && account.adminDetails) || {};
  const isAdmin = Boolean(adminDetails && adminDetails.isAdmin);
  return {
    props: {
      isAdmin: isAdmin,
    },
  };
};

export default ErrorPage;
