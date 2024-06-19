import React from "react";
import { render } from "@testing-library/react";
import Index from "./Index";

it("renders correctly", () => {
  const { asFragment } = render(<Index />);
  expect(asFragment()).toMatchSnapshot();
});
