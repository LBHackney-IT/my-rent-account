import React from "react";
import { render } from "@testing-library/react";

import ContactLink from "./ContactLink";

describe("ContactLink component", () => {
  const props = {
    contactEmail: "housing.rents@hackney.gov.uk",
    contactNumber: "020 8356 3100 (Mon-Fri 9am - 5pm)",
  };
  it("should render properly", () => {
    const { asFragment } = render(<ContactLink {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
