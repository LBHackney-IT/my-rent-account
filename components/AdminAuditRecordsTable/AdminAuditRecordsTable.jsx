import React from "react";
import PropTypes from "prop-types";

const adminAuditRecordsTable = ({ adminAuditRecords }) => (
  <div style={{ overflow: "auto" }}>
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Date
          </th>
          <th scope="col" className="govuk-table__header">
            Rent Account Number
          </th>
          <th scope="col" className="govuk-table__header">
            CSSO Login
          </th>
          <th scope="col" className="govuk-table__header">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {adminAuditRecords.map((record, i) => (
          <tr key={i} className="govuk-table__row">
            <td className="govuk-table__cell">
              {new Date(record.timeStamp).toLocaleDateString("en-GB")}
            </td>
            <td className="govuk-table__cell">{record.rentAccountNumber}</td>
            <td className="govuk-table__cell">
              {record.cssoLogin ? "YES" : "NO"}
            </td>
            <td className="govuk-table__cell">
              {record.auditAction.toUpperCase()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {adminAuditRecords.length === 0 && (
      <div className="govuk-body">No records to show</div>
    )}
  </div>
);

adminAuditRecordsTable.propTypes = {
  adminAuditRecords: PropTypes.arrayOf(
    PropTypes.shape({
      timeStamp: PropTypes.string.isRequired,
      rentAccountNumber: PropTypes.string.isRequired,
      cssoLogin: PropTypes.bool,
      auditAction: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default adminAuditRecordsTable;
