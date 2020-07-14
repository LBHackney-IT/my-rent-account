import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "lib/session";

import { getAccountName } from "lib/api/accounts";
import { Button, Radios, TextInput } from "components/Form";

const AnotherAmountRadio = ({ errors, register }) => (
  <>
    Pay Another Amount
    <TextInput
      name="toPay"
      placeholder="£ 0"
      inputClassName="govuk-input--width-10"
      inputMode="numeric"
      register={register({
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

const Account = ({ currentBalance, accountNumber }) => {
  const { register, errors, handleSubmit, setError } = useForm({
    defaultValues: { paymentType: `current` },
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
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Radios
          options={[
            {
              value: "current",
              label: `Pay Current Balance £${currentBalance}`,
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
          <Button text="Make a Payment" type="submit" />
        </div>
      </form>
    </div>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  currentBalance: PropTypes.string.isRequired,
  accountNumber: PropTypes.string.isRequired,
};

export default Account;

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const accountName = await getAccountName(account);
  return {
    props: {
      ...accountName,
      accountNumber: account.accountNumber,
    },
  };
};
