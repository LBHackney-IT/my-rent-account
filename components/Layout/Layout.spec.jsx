import React from "react";
import { render } from "@testing-library/react";

import Layout from "./Layout";

jest.mock("./Footer/Footer", () => "footer");
jest.mock("./Header/Header", () => "header");

describe("Layout component", () => {
  it("should render properly", () => {
    const { asFragment } = render(
      <Layout serviceName="my rent account">
        <div>foo</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
