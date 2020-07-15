import React from "react";
import { render } from "@testing-library/react";

import AccountLogin from "./AccountLogin";

describe("AccountLogin component", () => {
  const props = {
    onSubmit: jest.fn(),
    submitText: "foo",
  };
  it("should render properly", () => {
    const { asFragment } = render(<AccountLogin {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
