import React from "react";
import { useRouter } from "next/router";

import SummaryList from "components/SummaryList/SummaryList";

const PaymentConfirmation = () => {
  const router = useRouter();
  const { amount, accountNumber, receiptnumber } = router.query;
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Payment complete</h1>
        <div className="govuk-panel__body">
          Your receipt number
          <br />
          <strong>{receiptnumber}</strong>
        </div>
      </div>
      <div className="govuk-!-margin-9">
        <p className="govuk-body">
          Thank you for your payment for rent account{" "}
          <strong>{accountNumber}</strong>.
        </p>
        <SummaryList
          list={[
            {
              title: "Rent Account:",
              value: accountNumber,
            },
            {
              title: "Payment Amount:",
              value: `£${amount}`,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentConfirmation;
