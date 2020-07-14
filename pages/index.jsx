import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Router from "next/router";
import isPostcodeValid from "uk-postcode-validator";
import { getSession, setSession } from "lib/session";

import { Button, TextInput } from "components/Form";

export default function Home() {
  const [error, setError] = useState();
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (params) => {
    try {
      setError();
      await axios.get("/api/accounts", { params });
      setSession(params);
      Router.push("/account", `/account`);
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
          register={register({
            required: "Post Code is required",
            validate: (value) =>
              isPostcodeValid(value) || "You need a valid post code",
          })}
        />
        <Button text="View account" disabled={submitting} />
      </form>
      {error && <ErrorMessage text={error} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx, false);
  if (account) {
    ctx.res.writeHead(302, {
      Location: "/account",
    });
    ctx.res.end();
  }
  return {
    props: {},
  };
};
