import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, TextInput } from "components/Form";
import { getAccount } from "utils/api/accounts";

export default function Home() {
  const [account, setAccount] = useState();
  const [error, setError] = useState();
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (params) => {
    try {
      setError();
      const data = await getAccount(params);
      setAccount(data.value);
    } catch (e) {
      console.error(e);
      setError(e.response.data);
    }
  };
  return (
    <div>
      <h1>My Rent Account</h1>
      <p className="govuk-body">
        To view your rent account balance and make a payment, please enter your
        rent account number and post code in the boxes below.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Rent Account Number:"
          hint="You will find this on your rent card or statement"
          name="accountNumber"
          placeholder="e.g. 1234567890"
          inputClassName="govuk-input--width-10"
          inputMode="numeric"
          error={errors.accountNumber}
          register={register({
            required: "Rent Account Number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Account Number must be a number",
            },
          })}
        />
        <TextInput
          label="Post Code:"
          name="postcode"
          placeholder="e.g. E8 1EA"
          inputClassName="govuk-input--width-10"
          inputMode="numeric"
          error={errors.postcode}
          register={register({ required: "Post Code is required" })}
        />
        <Button text="Make a Payment" />
      </form>
      {account && <pre>{JSON.stringify(account, null, 2)}</pre>}
      {error && <div>OPS!</div>}
    </div>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      date: new Date().getTime(),
      expirationDate: process.env.EXPIRATION_DATE || null,
    },
  };
};
