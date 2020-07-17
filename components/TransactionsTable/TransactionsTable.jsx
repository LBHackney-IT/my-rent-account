import React from "react";
import PropTypes from "prop-types";

import { getProperCurrency } from "utils/string";

const transactionsTable = ({ transactions }) => (
  <div style={{ overflow: "auto" }}>
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Date
          </th>
          <th scope="col" className="govuk-table__header">
            Description
          </th>
          <th
            scope="col"
            className="govuk-table__header govuk-table__header--numeric"
          >
            Rent
          </th>
          <th
            scope="col"
            className="govuk-table__header govuk-table__header--numeric"
          >
            Paid In
          </th>
          <th
            scope="col"
            className="govuk-table__header govuk-table__header--numeric"
          >
            Balance
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {transactions.map((transaction, i) => (
          <tr key={i} className="govuk-table__row">
            <td className="govuk-table__cell">
              {new Date(transaction.date).toLocaleDateString("en-GB")}
            </td>
            <td className="govuk-table__cell">{transaction.description}</td>
            <td className="govuk-table__cell govuk-table__cell--numeric">
              {getProperCurrency(transaction.out)}
            </td>
            <td className="govuk-table__cell govuk-table__cell--numeric">
              {getProperCurrency(transaction.in)}
            </td>
            <td className="govuk-table__cell govuk-table__cell--numeric">
              {getProperCurrency(transaction.balance)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

transactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      out: PropTypes.string,
      in: PropTypes.string,
      balance: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default transactionsTable;
