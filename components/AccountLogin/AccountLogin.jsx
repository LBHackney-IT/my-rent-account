import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Router from "next/router";
import isPostcodeValid from "uk-postcode-validator";

import { Button, TextInput } from "components/Form";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const AccountLogin = ({ onSubmit, onAsyncSubmit, submitText }) => {
  const [submitting, setSubmitting] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [error, setError] = useState();
  const onLogin = async (params) => {
    try {
      setSubmitting(true);
      setError();
      const account = await axios.get("/api/accounts", { params });
      await axios.post("/api/audit", { ...params, ...account });
      onSubmit && onSubmit(params);
      onAsyncSubmit && (await onAsyncSubmit(params));
      Router.push("/account");
    } catch (e) {
      console.error(e);
      setError(
        e.response.status === 404 ? (
          <div>
            <p>
              This rent account number and postcode combination is incorrect.
            </p>
            Please check if you have entered the correct information.
          </div>
        ) : (
          e.response.data
        )
      );
    }
    setSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <TextInput
        label="Rent account number:"
        hint="You will find this on your rent card or statement"
        name="accountNumber"
        placeholder="e.g. 1234567890"
        inputClassName="govuk-input--width-10"
        inputMode="numeric"
        error={errors.accountNumber}
        register={register({
          required: "Rent account number is required",
          minLength: {
            value: 10,
            message: "You are missing some digits in the rent account number",
          },
          pattern: {
            value: /^[0-9]+$/,
            message: "Account Number must be a number",
          },
        })}
      />
      <TextInput
        label="Post code:"
        name="postcode"
        placeholder="e.g. E8 1EA"
        inputClassName="govuk-input--width-10"
        error={errors.postcode}
        register={register({
          required: "Post code is required",
          validate: (value) =>
            isPostcodeValid(value) || "You need a valid post code",
        })}
      />
      <Button text={submitText} disabled={submitting} />
      {error && <ErrorMessage text={error} />}
    </form>
  );
};

AccountLogin.propTypes = {
  onSubmit: PropTypes.func,
  onAsyncSubmit: PropTypes.func,
  submitText: PropTypes.string.isRequired,
};

export default AccountLogin;
