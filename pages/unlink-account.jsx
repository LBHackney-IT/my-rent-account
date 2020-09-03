import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";
import axios from "axios";

import { getSession, deleteSession } from "lib/session";
import { getLinkedAccount } from "lib/api/accounts";
import { Button } from "components/Form";
import AdminNavBar from "components/AdminNavBar/AdminNavBar";

const UnlinkAccount = ({ isAdmin, accounts }) => {
  const unlink = async (id) => {
    await axios.delete(`/api/link-account?linkId=${id}`);
    deleteSession();
  };
  return (
    <div className="govuk-body">
      <NextSeo title="Unlink Account" noindex={true} />
      {isAdmin && <AdminNavBar />}
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
  isAdmin: PropTypes.bool,
  accounts: PropTypes.array.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const isAdmin = Boolean(account.isAdmin);
  const accounts = await getLinkedAccount(account);
  return {
    props: {
      isAdmin: isAdmin,
      accounts,
    },
  };
};

export default UnlinkAccount;
