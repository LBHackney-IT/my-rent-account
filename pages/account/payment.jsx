import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "lib/session";

import { getAccountDetails } from "lib/api/accounts";
import { Button, Radios, TextInput } from "components/Form";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";

const AnotherAmountRadio = ({ errors, register }) => (
  <>
    Pay another amount
    <TextInput
      name="toPay"
      placeholder="£ 0"
      inputClassName="govuk-input--width-10"
      inputMode="numeric"
      register={register({
        validate: {
          positive: (value) =>
            parseInt(value, 10) > 0 || "Amount must be bigger than 0",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Account Number must be a number",
        },
      })}
      error={errors.toPay}
    />
  </>
);

AnotherAmountRadio.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    toPay: PropTypes.shape({}),
  }),
};

const Account = ({ currentBalance, hasArrears, accountNumber }) => {
  const { register, errors, handleSubmit, setError } = useForm({
    defaultValues: { paymentType: hasArrears ? "current" : "custom" },
  });
  const onSubmit = async (formData) => {
    if (
      formData.paymentType === "custom" &&
      isNaN(parseFloat(formData.toPay))
    ) {
      setError("toPay", {
        type: "manual",
        message: "You need to specify a valid amount",
      });
    } else {
      const { data } = await axios.get("/api/payment", {
        params: {
          accountNumber,
          amount:
            formData.paymentType === "current"
              ? currentBalance
              : formData.toPay,
        },
      });
      window.location.href = data;
    }
  };
  return (
    <div>
      <NextSeo title="Payment" noindex={true} />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <h1>Make a payment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Radios
          options={[
            {
              value: "current",
              label: `Pay current balance £${currentBalance}`,
              disabled: !hasArrears,
            },
            {
              value: "custom",
              label: <AnotherAmountRadio errors={errors} register={register} />,
            },
          ]}
          register={register}
          isRadiosInline={false}
          name="paymentType"
          error={errors.paymentType}
        />
        <div style={{ textAlign: "center" }}>
          <Button text="Make a payment" type="submit" />
        </div>
      </form>
      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
      <UsefulLinks />
    </div>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  currentBalance: PropTypes.string.isRequired,
  hasArrears: PropTypes.bool.isRequired,
  accountNumber: PropTypes.string.isRequired,
};

export default Account;

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const accountName = await getAccountDetails(account);
  return {
    props: {
      ...accountName,
      accountNumber: account.accountNumber,
    },
  };
};
