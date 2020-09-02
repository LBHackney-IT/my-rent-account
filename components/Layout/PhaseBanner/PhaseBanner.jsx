import React from "react";
import PropTypes from "prop-types";

const PhaseBanner = ({ phase, contactEmail }) => (
  <div className="govuk-phase-banner">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag">
        {phase}
      </strong>
      <span className="govuk-phase-banner__text">
        This is a new service – If you have an account query or feedback, please
        email us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </span>
    </p>
  </div>
);

PhaseBanner.propTypes = {
  phase: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
};

export default PhaseBanner;
