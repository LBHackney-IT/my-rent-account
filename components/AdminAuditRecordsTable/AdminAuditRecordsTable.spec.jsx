import React from "react";
import { render } from "@testing-library/react";

import AdminAuditRecordsTable from "./AdminAuditRecordsTable";

describe("AdminAuditRecordsTable component", () => {
  const props = {
    adminAuditRecords: [
      {
        timeStamp: "2016-09-05T00:00:00",
        rentAccountNumber: "9101255702",
        cssoLogin: true,
        auditAction: "view",
      },
      {
        timeStamp: "2016-09-05T00:00:00",
        rentAccountNumber: "9104565004",
        cssoLogin: false,
        auditAction: "view",
      },
    ],
  };
  it("should render properly", () => {
    const { asFragment } = render(<AdminAuditRecordsTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
