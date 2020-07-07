import React from "react";
import { render } from "@testing-library/react";

import RentBreakdown from "./RentBreakdown";

describe("RentBreakdown component", () => {
  it("should render properly", () => {
    const { asFragment } = render(
      <RentBreakdown rent={123} toPay={321} benefits={111} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
