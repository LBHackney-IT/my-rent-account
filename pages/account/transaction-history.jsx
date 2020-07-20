import React, { useState } from "react";
import sub from "date-fns/sub";
import isBefore from "date-fns/isBefore";

import { getSession } from "lib/session";
import { getTransactions } from "lib/api/transactions";
import TransactionsTable from "components/TransactionsTable/TransactionsTable";
import { Select } from "components/Form";

const OPTIONS = Array.apply(null, { length: 12 }).map((x, i) => {
  const months = i + 1;
  return {
    value: months,
    text: months === 1 ? "Last month" : `Last ${months} months`,
  };
});

const today = new Date();

const TransactionHistoryPage = ({ transactions }) => {
  const [filter, setFilter] = useState(1);
  const filterDate = sub(today, {
    months: filter,
  });
  const filteredTranactions = transactions.filter(
    (transaction) => !isBefore(new Date(transaction.date), filterDate)
  );
  return (
    <div>
      <h1>Transaction history</h1>
      <p className="govuk-body">
        Due to end of week processing, your current and running balances may not
        be correct on a Sunday. We are working to resolve this issue and
        apologise for the inconvenience this may cause.
      </p>
      <Select
        options={OPTIONS}
        onChange={setFilter}
        label="Show transactions from:"
        name="filter"
        value={filter}
      />
      <TransactionsTable transactions={filteredTranactions} />
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
