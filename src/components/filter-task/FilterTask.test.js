import React from "react";
import { render } from "@testing-library/react";
import FilterTask from "./FilterTask";

it("renders correctly", () => {
  const { asFragment } = render(<FilterTask />);
  expect(asFragment()).toMatchSnapshot();
});
