import React from "react";

const AdminLogin = ({ submitText, gssoUrl }) => {
  
  return (
    <div>
      <a 
        className="govuk-button"
        href={gssoUrl}>
        {submitText}
        </a>
    </div>
    
  );
};

export default AdminLogin;