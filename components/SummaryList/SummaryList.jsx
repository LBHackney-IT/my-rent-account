import React from "react";
import PropTypes from "prop-types";

const SummaryList = ({ list }) => (
  <dl className="govuk-summary-list">
    {list &&
      list.map(({ title, value, cta }) => (
        <div key={title} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{title}</dt>
          <dd className="govuk-summary-list__value">{value}</dd>
          <dd className="govuk-summary-list__actions">
            {cta && (
              <a className="govuk-link" onClick={cta.onClick}>
                {cta.text}
              </a>
            )}
          </dd>
        </div>
      ))}
  </dl>
);

SummaryList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      cta: PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
      }),
    }).isRequired
  ),
};

export default SummaryList;
