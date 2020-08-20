import React from "react";

export default function AccessDenied() {
  return (
    <div>
      <h1>Access denied</h1>
      <p className="govuk-body">
        Sorry, but access to that page is for administrators only.
      </p>
    </div>
  );
}

AccessDenied.propTypes = {};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
