import React from "react";
import { render } from "@testing-library/react";

import TransactionsTable from "./TransactionsTable";

describe("TransactionsTable component", () => {
  const props = {
    transactions: [
      {
        date: "2016-09-05T00:00:00",
        description: "Total Charge",
        in: "",
        out: "¤0.00",
        balance: "¤185.68",
      },
      {
        date: "2016-04-10T00:00:00",
        description: "Housing Benefit",
        in: "¤121.16",
        out: "",
        balance: "¤214.92",
      },
    ],
  };
  it("should render properly", () => {
    const { asFragment } = render(<TransactionsTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
