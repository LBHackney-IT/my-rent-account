import React from "react";
import PropTypes from "prop-types";

import { getAllRentBreakdowns } from "lib/api/tenancy";
import SummaryList from "components/SummaryList/SummaryList";
import UsefulLinks from "components/UsefulLinks/UsefulLinks";
import { getSession } from "lib/session";
import { getAccountDetails } from "lib/api/accounts";

const Account = ({ items }) => {
  return (
    <div>
      <h1>Rent breakdown</h1>
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

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const { tenancyAgreementId } = await getAccountDetails(account);
  const items = await getAllRentBreakdowns({ tenancyAgreementId });
  return {
    props: {
      items,
    },
  };
};
