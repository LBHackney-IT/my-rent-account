import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const Select = ({
  label,
  hint,
  name,
  options,
  onChange,
  register,
  error,
  children,
  value,
}) => (
  <div
    className={cx("govuk-form-group", {
      "govuk-form-group--error": error,
    })}
  >
    {label && (
      <label className="govuk-label" htmlFor={name}>
        {label}
      </label>
    )}
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {children}
    {error && <ErrorMessage text={error.message} />}
    <select
      className="govuk-select"
      id={name}
      name={name}
      ref={register}
      aria-describedby={hint && `${name}-hint`}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
    >
      {options.map((option) => {
        const { value, text } =
          typeof option === "string" ? { value: option, text: option } : option;
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        text: PropTypes.string.isRequired,
      }),
    ])
  ),
  selected: PropTypes.string,
  register: PropTypes.func,
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Select;
