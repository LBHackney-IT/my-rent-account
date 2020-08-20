import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const AdminLogin = ({ ctx, onSubmit, submitText, gssoUrl }) => {
  const [error, setError] = useState();
  
  const onLogin = async (params) => {
    try {
      console.log('on login');

      onSubmit && onSubmit({});

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
  };

  return (
    <div>
      <a 
        className="govuk-button"
          href={gssoUrl} 
          onClick={onLogin}>
          {submitText}
        </a>
    </div>
    
  );
};

AdminLogin.propTypes = {
  ctx: PropTypes.object,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string.isRequired,
  gssoUrl: PropTypes.string.isRequired
};

export default AdminLogin;
