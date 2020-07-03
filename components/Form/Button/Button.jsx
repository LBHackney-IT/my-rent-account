import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Button = ({ onClick, text, type, isSecondary, ...otherProps }) => (
  <div className="govuk-form-group">
    <button
      className={cx("govuk-button", { "govuk-button--secondary": isSecondary })}
      data-module="govuk-button"
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {text}
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  isSecondary: PropTypes.bool,
};

export default Button;
