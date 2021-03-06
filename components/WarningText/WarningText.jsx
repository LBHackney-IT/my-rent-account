import React from "react";
import PropTypes from "prop-types";

export const WarningText = ({ children }) => (
  <div className="govuk-warning-text">
    <span className="govuk-warning-text__icon" aria-hidden="true">
      !
    </span>
    <strong className="govuk-warning-text__text">
      <span className="govuk-warning-text__assistive">Warning</span>
      {children}
    </strong>
  </div>
);

WarningText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningText;
