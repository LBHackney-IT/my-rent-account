import React from "react";
import Router from "next/router";

import { getSession } from "lib/session";
import { getTransactions } from "lib/api/transactions";
import TransactionsTable from "components/TransactionsTable/TransactionsTable";

const TransactionHistoryPage = ({ transactions }) => {
  Router.events.on("routeChangeComplete", () => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <h1>Transaction History</h1>
      <p className="govuk-body">
        Due to end of week processing, your current and running balances may not
        be correct on a Sunday. We are working to resolve this issue and
        apologise for the inconvenience this may cause.
      </p>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

TransactionHistoryPage.propTypes = {
  ...TransactionsTable.propTypes,
};

export default TransactionHistoryPage;

export const getServerSideProps = async (ctx) => {
  const account = getSession(ctx);
  const transactions = await getTransactions(account);
  return {
    props: {
      transactions,
    },
  };
};
