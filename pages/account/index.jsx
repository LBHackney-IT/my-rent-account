import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Router from "next/router";
import { postAuditLogin } from "lib/api/audit";
import { getAccount, getAccountName } from "lib/api/accounts";
import SummaryList from "components/SummaryList/SummaryList";
import ErrorSummary from "components/ErrorSummary/ErrorSummary";
import RentBreakdown from "components/RentBreakdown/RentBreakdown";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";
import { Button } from "components/Form";

const Account = ({
  name,
  currentBalance,
  accountNumber,
  hasArrears,
  nextPayment,
  toPay,
  rent,
  benefits,
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
        <div className="govuk-grid-column-one-third">
          <RentBreakdown rent={rent} toPay={toPay} benefits={benefits} />
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
  toPay: PropTypes.number.isRequired,
  rent: PropTypes.number.isRequired,
  benefits: PropTypes.number.isRequired,
  nextPayment: PropTypes.string.isRequired,
};

export default Account;

export const getServerSideProps = async ({ query }) => {
  const account = await getAccount(query);
  await postAuditLogin({ ...query, ...account });
  const accountName = await getAccountName(query);
  return {
    props: {
      ...accountName,
      accountNumber: query.accountNumber,
    },
  };
};
