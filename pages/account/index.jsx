import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Router from "next/router";

import { getAccountDetails } from "lib/api/accounts";
import { getTransactions } from "lib/api/transactions";
import TransactionsTable from "components/TransactionsTable/TransactionsTable";
import SummaryList from "components/SummaryList/SummaryList";
import ErrorSummary from "components/ErrorSummary/ErrorSummary";
import RentBreakdown from "components/RentBreakdown/RentBreakdown";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";
import { Button } from "components/Form";
import NotLoggedBox from "components/NotLoggedBox/NotLoggedBox";
import { getSession } from "lib/session";

const { CSSO_DOMAIN, CSSO_ID, CSSO_SECRET, URL_PREFIX } = process.env;

const Account = ({
  name,
  currentBalance,
  accountNumber,
  hasArrears,
  nextPayment,
  toPay,
  rent,
  benefits,
  transactions,
  isWithPrivacy,
  loginUrl,
  registerUrl,
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
        <div className="govuk-grid-column-two-thirds">
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
            onClick={() => Router.push("/account/payment")}
          >
            <Button text="Make a Payment" />
          </div>
          {transactions && (
            <>
              <p className="govuk-body">
                <strong>Recent Transaction and Statements:</strong>
              </p>
              {isWithPrivacy ? (
                <NotLoggedBox loginUrl={loginUrl} registerUrl={registerUrl} />
              ) : (
                <>
                  <p className="govuk-body">
                    Due to end of week processing, your current and running
                    balances may not be correct on a Sunday. We are working to
                    resolve this issue and apologise for the inconvenience this
                    may cause.
                  </p>
                  <TransactionsTable transactions={transactions} />
                  <div
                    style={{ textAlign: "center" }}
                    onClick={() => Router.push("/account/transaction-history")}
                  >
                    <Button text="View Rent Statements" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="govuk-grid-column-one-third">
          <h2>Rent Breakdown</h2>
          {isWithPrivacy ? (
            <NotLoggedBox loginUrl={loginUrl} registerUrl={registerUrl} />
          ) : (
            <RentBreakdown rent={rent} toPay={toPay} benefits={benefits} />
          )}
          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          <UsefulLinks />
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
  toPay: PropTypes.string.isRequired,
  rent: PropTypes.number.isRequired,
  benefits: PropTypes.string.isRequired,
  nextPayment: PropTypes.string.isRequired,
  transactions: PropTypes.array,
  isWithPrivacy: PropTypes.bool,
  loginUrl: PropTypes.string.isRequired,
  registerUrl: PropTypes.string.isRequired,
};

export default Account;

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const isWithPrivacy = Boolean(!account.cssoId);
  const accountDetails = await getAccountDetails(account, isWithPrivacy);
  const transactions = await getTransactions({ ...account, ...accountDetails });
  const queryString = `?grant_type=authorization_code&client_id=${CSSO_ID}&client_secret=${CSSO_SECRET}&scope=openid%20email&response_type=code&redirect_uri=https://${URL_PREFIX}/auth`;
  return {
    props: {
      ...accountDetails,
      ...account,
      transactions: transactions.slice(0, 3),
      isWithPrivacy,
      registerUrl: `${CSSO_DOMAIN}/users/sign_up${queryString}`,
      loginUrl: `${CSSO_DOMAIN}/oauth/authorize${queryString}`,
    },
  };
};
