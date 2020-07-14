import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { getSession, setSession } from "lib/session";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState();
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (params) => {
    try {
      setSubmitting(true);
      setError();
      await axios.get("/api/accounts", { params });
      setSession(params);
      Router.push("/account", `/account`);
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
    <div>
      <h1>My Rent Account</h1>
      <p className="govuk-body">
        To view your rent account balance and make a payment, please enter your
        rent account number and post code in the boxes below.
      </p>

      <AccountLogin
        onSubmit={onSubmit}
        submitText="View account"
        isSubmitting={submitting}
      />
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
