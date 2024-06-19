import React from "react";
import { render } from "@testing-library/react";
import SearchTask from "./SearchTask";

it("renders correctly", () => {
  const { asFragment } = render(<SearchTask />);
  expect(asFragment()).toMatchSnapshot();
});
