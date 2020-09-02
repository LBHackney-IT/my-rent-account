import React from "react";
import PropTypes from "prop-types";

const ContactLink = ({ contactEmail, contactNumber }) => {
  return (
    <div>
      <p className="govuk-body">
        If you have an account query, please email us at{" "}
        <a href={contactEmail}>{contactEmail}</a>, or call us on {contactNumber}
      </p>
    </div>
  );
};

ContactLink.propTypes = {
  contactEmail: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
};

export default ContactLink;
