import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Router from "next/router";

import { getAccount, getAccountName } from "lib/api/accounts";
import SummaryList from "components/SummaryList/SummaryList";
import ErrorSummary from "components/ErrorSummary/ErrorSummary";
import { Button } from "components/Form";

import linkdata from "data/usefulLinks.json";

const Account = ({
  name,
  currentBalance,
  accountNumber,
  hasArrears,
  nextPayment,
  toPay,
}) => {
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
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters">
          <h2>Balance and Transactions</h2>
          <div
            className={cx(
              "govuk-panel",
              hasArrears ? "govuk-panel--error" : "govuk-panel--confirmation"
            )}
          >
            <h3 className="govuk-panel__title">Current Balance:</h3>
            <div className="govuk-panel__body">
              <strong>£{currentBalance}</strong> (
              {hasArrears ? "Arrears" : "Credit"})
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="govuk-body">
              Payment is due on: <strong>{nextPayment}</strong>
            </div>
            <div className="govuk-body">Payment amount due: £{toPay}</div>
          </div>
          {hasArrears && (
            <ErrorSummary
              body={
                <>
                  <p>
                    Your account is now in arrears. You must make full payment
                    to clear your account.
                  </p>
                  <p>
                    If you have problems paying your rent you must get in
                    contact with us immediately to prevent further action.
                  </p>
                </>
              }
            />
          )}
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
        <div className="govuk-grid-column-one-quarter">
          <h2>Useful links</h2>
          {linkdata.map((usefulLinkData) => {
            return (
              <>
                <p>
                  <a
                    className="govuk-link govuk-link--no-visited-state"
                    href={usefulLinkData.link}
                  >
                    {usefulLinkData.title}
                  </a>
                </p>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  currentBalance: PropTypes.string.isRequired,
  accountNumber: PropTypes.string.isRequired,
  hasArrears: PropTypes.bool.isRequired,
  toPay: PropTypes.number.isRequired,
  nextPayment: PropTypes.string.isRequired,
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
