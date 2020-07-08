import React from "react";
import PropTypes from "prop-types";

const RentBreakdown = ({ rent, benefits, toPay }) => {
  const breakdown = [
    {
      title: "Your Rent:",
      value: rent,
    },
    {
      title: "Housing Benefit Payment:",
      value: benefits,
    },
    {
      title: "What you Pay:",
      value: toPay,
    },
  ];
  return (
    <>
      <h2>Rent Breakdown</h2>
      <table className="govuk-table">
        <tbody className="govuk-table__body">
          {breakdown.map(({ title, value }) => (
            <tr key={title} className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {title}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                £{value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/account/rent-breakdown" className="govuk-link">
        <strong>See how your rent is calculated</strong>
      </a>
    </>
  );
};

RentBreakdown.propTypes = {
  rent: PropTypes.number.isRequired,
  benefits: PropTypes.string.isRequired,
  toPay: PropTypes.string.isRequired,
};

export default RentBreakdown;
