import React from "react";
import { render } from "@testing-library/react";

import UsefulLinks from "./UsefulLinks";

jest.mock("data/usefulLinks.json", () => ({
  links: [
    {
      title: "foo",
      link: "https://hackney.gov.uk/foo/",
    },
    {
      title: "bar",
      link: "https://hackney.gov.uk/bar/",
    },
  ],
}));

describe("UsefulLinks component", () => {
  it("should render properly", () => {
    const { asFragment } = render(<UsefulLinks />);
    expect(asFragment()).toMatchSnapshot();
  });
});
