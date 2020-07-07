import React from "react";
import PropTypes from "prop-types";

import { getRentBreakdown } from "lib/api/tenancy";
import SummaryList from "components/SummaryList/SummaryList";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";

const Account = ({ items }) => {
  return (
    <div>
      <h1>Rent Breakdown</h1>
      <SummaryList
        list={items.map(({ description, value }) => ({
          title: description,
          value: `£${value}`,
        }))}
      />
      <hr className="govuk-section-break govuk-section-break--l" />
      <UsefulLinks />
    </div>
  );
};

Account.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Account;

export const getServerSideProps = async () => {
  return {
    props: {
      items: getRentBreakdown(),
    },
  };
};
