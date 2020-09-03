import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import axios from "axios";
import { useRouter } from "next/router";

import { getSession, updateSession } from "lib/session";
import AccountLogin from "components/AccountLogin/AccountLogin";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";
import WarningText from "components/WarningText/WarningText";

const LinkAccount = ({ cssoId }) => {
  const { query } = useRouter();
  return (
    <div>
      <NextSeo title="Link Account" noindex={true} />
      {query.unlinkSuccess && (
        <WarningText>
          Your old rent account has been unlinked successfully
        </WarningText>
      )}
      <h1>Link rent account</h1>
      <div className="govuk-body govuk-!-margin-bottom-9">
        <p>
          For security reasons you need to add your rent account details to your
          Hackney account.
        </p>
        <p>
          Linking your account is quick and easy and you will only need to do
          this once. If you are having problem, please follow the steps in our{" "}
          <a href="https://hackney.gov.uk/rent-account-help#link">help guide</a>
          .
        </p>
      </div>
      <AccountLogin
        onAsyncSubmit={async (params) => {
          await axios.post("/api/link-account", null, {
            params: { cssoId, ...params },
          });
          updateSession(params);
        }}
        submitText="Link your rent account"
      />
      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <UsefulLinks />
    </div>
  );
};

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
