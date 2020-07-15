import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import isPostcodeValid from "uk-postcode-validator";

import { Button, TextInput } from "components/Form";

const AccountLogin = ({ onSubmit, submitText, isSubmitting }) => {
  const { register, errors, handleSubmit } = useForm();
  return (
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
        error={errors.postcode}
        register={register({
          required: "Post Code is required",
          validate: (value) =>
            isPostcodeValid(value) || "You need a valid post code",
        })}
      />
      <Button text={submitText} disabled={isSubmitting} />
    </form>
  );
};

AccountLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
};

export default AccountLogin;
