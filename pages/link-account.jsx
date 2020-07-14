import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import axios from "axios";

import { getSession, updateSession } from "lib/session";
import AccountLogin from "components/AccountLogin/AccountLogin";

const LinkAccount = ({ cssoId }) => {
  const [error, setError] = useState();
  const onSubmit = async (params) => {
    try {
      const account = await axios.get("/api/accounts", { params });
      await axios.post("/api/link-account", null, {
        params: { cssoId, ...params },
      });
      updateSession(params);
      await axios.post("/api/audit", { ...params, ...account });
      Router.push("/account");
    } catch (e) {
      console.error(e);
      setError(e.response.data);
    }
  };
  return (
    <div>
      <h1>Link Rent Account</h1>
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
      <AccountLogin onSubmit={onSubmit} submitText="Link your Rent Account" />
      {error && <div>OPS!</div>}
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
