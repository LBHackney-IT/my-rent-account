import React from "react";
import { render } from "@testing-library/react";

import Layout from "./Layout";

jest.mock("lbh-frontend-react", () => ({
  Container: "lbh-Container",
  Header: "lbh-Header",
  Main: "lbh-Main",
  Paragraph: "lbh-Paragraph",
  Tag: "lbh-Tag",
}));

describe("Layout component", () => {
  it("should render properly", () => {
    const { asFragment } = render(
      <Layout>
        <div>foo</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
