import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const defaultOptions = ["Yes", "No"];

const Checkbox = ({
  label,
  hint,
  name,
  options = defaultOptions,
  error,
  register,
  children,
  isChecboxesSmall = false,
  ...otherProps
}) => (
  <div
    className={cx("govuk-form-group lbh-form-group", {
      "govuk-form-group--error": error,
    })}
  >
    <fieldset className="govuk-fieldset" aria-describedby={name}>
      <legend className="govuk-fieldset__legend govuk-label--m" htmlFor={name}>
        {label}
      </legend>

      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      {children}
      {error && <ErrorMessage text={error.message} />}
      <div
        className={cx("govuk-checkboxes  lbh-checkboxes", {
          "govuk-checkboxes--small": isChecboxesSmall,
        })}
      >
        {options.map((option) => {
          const { value, label } =
            typeof option === "string"
              ? { value: option, label: option }
              : option;
          return (
            <div className="govuk-checkboxes__item" key={value}>
              <input
                className={cx("govuk-checkboxes__input", {
                  "govuk-input--error": error,
                })}
                id={`${name}_${value}`}
                name={name}
                type="checkbox"
                value={value}
                ref={register}
                aria-describedby={hint && `${name}-hint`}
                checked={option.checked}
                disabled={option.disabled}
                {...otherProps}
              />
              <label
                className="govuk-label govuk-checkboxes__label"
                htmlFor={`${name}_${value}`}
              >
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  options: PropTypes.array,
  hint: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  isChecboxesSmall: PropTypes.bool,
};

export default Checkbox;
