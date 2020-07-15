import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { getSession, deleteSession } from "lib/session";
import { getLinkedAccount } from "lib/api/accounts";
import { Button } from "components/Form";

const UnlinkAccount = ({ accounts }) => {
  const unlink = async (id) => {
    await axios.delete(`/api/link-account?linkId=${id}`);
    deleteSession();
  };
  return (
    <div className="govuk-body">
      <h1>Linked accounts</h1>
      {accounts.length === 0 && "No accounts linked"}
      {accounts.map(
        ({ rent_account_number, hackney_csso_linked_rent_accountid }) => (
          <div key={rent_account_number}>
            {rent_account_number}{" "}
            <Button
              text="Unlink"
              onClick={() => unlink(hackney_csso_linked_rent_accountid)}
              isSecondary
            />
          </div>
        )
      )}
    </div>
  );
};

UnlinkAccount.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const accounts = await getLinkedAccount(account);
  return {
    props: { accounts },
  };
};

export default UnlinkAccount;
