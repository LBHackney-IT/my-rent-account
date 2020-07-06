import React from "react";
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
  } = router.query;
  const payed = `£${parseFloat(amount).toFixed(2)}`;
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Payment Received</h1>
        <div className="govuk-panel__body">{payed}</div>
      </div>
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
        Your payment will not be shown on your account immediately. It can take
        up to 5 days for payments to be reflected on your rent account.
      </div>
    </div>
  );
};

export default PaymentConfirmation;
