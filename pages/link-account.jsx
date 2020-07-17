import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { getSession, updateSession } from "lib/session";
import AccountLogin from "components/AccountLogin/AccountLogin";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";

const LinkAccount = ({ cssoId }) => (
  <div>
    <h1>Link Rent Account</h1>
    <div className="govuk-body govuk-!-margin-bottom-9">
      <p>
        For security reasons you need to add your rent account details to your
        Hackney account.
      </p>
      <p>
        Linking your account is quick and easy and you will only need to do this
        once. If you are having problem, please follow the steps in our{" "}
        <a href="https://hackney.gov.uk/rent-account-help#link">help guide</a>.
      </p>
    </div>
    <AccountLogin
      onAsyncSubmit={async (params) => {
        await axios.post("/api/link-account", null, {
          params: { cssoId, ...params },
        });
        updateSession(params);
      }}
      submitText="Link your Rent Account"
    />
    <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
    <UsefulLinks />
  </div>
);

LinkAccount.propTypes = {
  cssoId: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  return {
    props: { ...account },
  };
};

export default LinkAccount;
