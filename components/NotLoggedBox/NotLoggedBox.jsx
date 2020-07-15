import React from "react";
import PropTypes from "prop-types";

const NotLoggedBox = ({ loginUrl, registerUrl }) => (
  <div className="govuk-body">
    <p>
      <a href={loginUrl}>Login to your One Account</a> to view this information.
    </p>
    <p>
      If you haven&apos;t already registered you can{" "}
      <a href={registerUrl}>create an account</a>.
    </p>
  </div>
);

NotLoggedBox.propTypes = {
  loginUrl: PropTypes.string.isRequired,
  registerUrl: PropTypes.string.isRequired,
};

export default NotLoggedBox;
