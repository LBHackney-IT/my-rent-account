import React from "react";
import cx from "classnames";
import { useRouter } from "next/router";

import SummaryList from "components/SummaryList/SummaryList";
import { getTransactionType } from "utils/payment";
import { getNiceFormatDate } from "utils/date";

const PaymentConfirmation = () => {
  const router = useRouter();
  const {
    amount,
    accountNumber,
    receiptnumber,
    transactiontype,
    date,
    serviceprocessed,
  } = router.query;
  const payed = `£${parseFloat(amount).toFixed(2)}`;
  const isPaymentSuccessful = serviceprocessed === "true";
  return (
    <div>
      <div
        className={cx(
          "govuk-panel",
          isPaymentSuccessful
            ? "govuk-panel--confirmation"
            : "govuk-panel--error"
        )}
      >
        <h1 className="govuk-panel__title">
          Payment {isPaymentSuccessful ? "Received" : "Failed"}
        </h1>
        {isPaymentSuccessful && (
          <div className="govuk-panel__body">{payed}</div>
        )}
      </div>
      {isPaymentSuccessful ? (
        <>
          <div className="govuk-body govuk-!-margin-top-7">
            Thank you for your payment for rent account{" "}
            <strong>{accountNumber}</strong>.
          </div>
          <div className="govuk-!-margin-top-7">
            <h2>Payment Details:</h2>
            <SummaryList
              list={[
                {
                  title: "Payment Date",
                  value: getNiceFormatDate(date),
                },
                {
                  title: "Rent Account:",
                  value: accountNumber,
                },
                {
                  title: "Payment Amount:",
                  value: payed,
                },
                {
                  title: "Payment type",
                  value: getTransactionType(transactiontype),
                },
                {
                  title: "Receipt number",
                  value: receiptnumber,
                },
              ]}
            />
          </div>
          <div className="govuk-body govuk-!-margin-top-7">
            Your payment will not be shown on your account immediately. It can
            take up to 5 days for payments to be reflected on your rent account.
          </div>
        </>
      ) : (
        <div className="govuk-body govuk-!-margin-top-7">
          <p>Your payment has been declined.</p>
          <p>
            Please contact your bank for more details. No money has been taken
            from your account.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
