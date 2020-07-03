import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import { getAccount, getAccountName } from "lib/api/accounts";
import SummaryList from "components/SummaryList/SummaryList";
import { Button } from "components/Form";

const Account = ({ name, currentBalance, accountNumber }) => {
  return (
    <div>
      <h1>My Rent Account</h1>
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <h2>Account Details</h2>
      <SummaryList
        list={[
          {
            title: "Tenant:",
            value: name,
          },
          {
            title: "Rent Account:",
            value: accountNumber,
          },
        ]}
      />
      <h2>Balance and Transactions</h2>
      <div className="govuk-panel govuk-panel--confirmation">
        <h3 className="govuk-panel__title">Current Balance:</h3>
        <div className="govuk-panel__body">
          <strong>£{currentBalance}</strong> (Credit)
        </div>
      </div>
      <div
        style={{ textAlign: "center" }}
        onClick={() =>
          Router.push(
            "/account/payment",
            `/account/payment?accountNumber=${accountNumber}`
          )
        }
      >
        <Button text="Make a Payment" />
      </div>
    </div>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  currentBalance: PropTypes.string.isRequired,
  accountNumber: PropTypes.string.isRequired,
};

export default Account;

export const getServerSideProps = async ({ query }) => {
  await getAccount(query);
  const accountName = await getAccountName(query);
  return {
    props: {
      ...accountName,
      accountNumber: query.accountNumber,
    },
  };
};
